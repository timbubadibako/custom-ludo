import {
  activateTokens,
  deactivateAllTokens,
  incrementNumberOfConsecutiveSix,
  resetNumberOfConsecutiveSix,
} from '../slices/playersSlice';
import { type TPlayerColour, type TPlayer, type TToken } from '../../types';
import type { AppDispatch, RootState } from '../store';
import { areCoordsEqual } from '../../game/coords/logic';
import { changeTurnThunk } from './changeTurnThunk';
import type { useMoveAndCaptureToken } from '../../hooks/useMoveAndCaptureToken';
import type { TMoveData } from '../../types/tokens';
import { sleep } from '../../utils/sleep';
import { isAnyTokenActiveOfColour, isTokenMovable } from '../../game/tokens/logic';
import { 
    setActiveChallenge, 
    setLevel, 
    resetChallengesCount, 
    incrementCompletedChallenges,
    type TChallengeType
} from '../slices/boardSlice';
import { type TVibe } from '../slices/sessionSlice';

export const handlePostDiceRollThunk = (
  colour: TPlayerColour,
  diceNumber: number,
  moveAndCapture: ReturnType<typeof useMoveAndCaptureToken>,
  isRewardRoll = false
) => {
  return async (
    dispatch: AppDispatch,
    getState: () => RootState
  ): Promise<{ shouldContinue: boolean; moveData: TMoveData | null; isRewardRoll: boolean } | null> => {
    if (getState().players.isGameEnded) return null;
    
    if (!isRewardRoll) {
        if (diceNumber === 6) dispatch(incrementNumberOfConsecutiveSix(colour));
        else dispatch(resetNumberOfConsecutiveSix(colour));
    }

    dispatch(activateTokens({ all: diceNumber === 6, colour, diceNumber }));
    const players = getState().players.players;
    const player = players.find((p: TPlayer) => p.colour === colour);
    if (!player) return null;

    if (player.numberOfConsecutiveSix === 3) {
      dispatch(resetNumberOfConsecutiveSix(colour));
      dispatch(deactivateAllTokens(colour));

      // Punishment: Force a TRUTH challenge
      const state = getState();
      const vibe = state.session.vibe;
      const { currentLevel, completedChallengesCount } = state.board;
      const levelKey = `level${currentLevel}` as 'level1' | 'level2' | 'level3';

      import('../../game/coords/challengeData').then(({ CHALLENGE_DATA }) => {
          const typedChallengeData = CHALLENGE_DATA as Record<TVibe, Record<TChallengeType, { level1: string[]; level2: string[]; level3: string[] }>>;
          const pool = typedChallengeData[vibe]['truth'][levelKey];
          const randomText = pool[Math.floor(Math.random() * pool.length)];

          dispatch(setActiveChallenge({
              type: 'truth',
              title: '👿 GREEDY!',
              text: `You rolled 6 three times. Truth: ${randomText}`,
              playerColour: colour,
              isManual: false
          }));

          // Leveling logic
          if (completedChallengesCount >= pool.length - 3 && currentLevel < 3) {
              dispatch(setLevel(currentLevel + 1));
              dispatch(resetChallengesCount());
          } else {
              dispatch(incrementCompletedChallenges());
          }
      });

      if (player.isBot) await sleep(500);
      dispatch(changeTurnThunk(moveAndCapture));
      return { moveData: null, shouldContinue: false, isRewardRoll };
    }

    const areUnlockableTokensPresent =
      diceNumber === 6 && player.tokens.some((t: TToken) => areCoordsEqual(t.coordinates, t.initialCoords));

    if (areUnlockableTokensPresent) return { shouldContinue: true, moveData: null, isRewardRoll };

    const movableTokens = player.tokens.filter((t: TToken) => isTokenMovable(t, diceNumber));

    const areAllTokensInSameCoord =
      movableTokens.length === 0
        ? false
        : movableTokens.every((t: TToken) => areCoordsEqual(movableTokens[0].coordinates, t.coordinates));

    if (areAllTokensInSameCoord) {
      const moveData = await moveAndCapture(movableTokens[0], diceNumber);
      if (!moveData) {
        if (player.isBot) await sleep(500);
        dispatch(changeTurnThunk(moveAndCapture));
        return { shouldContinue: false, moveData, isRewardRoll };
      }
      const { hasTokenReachedHome, isCaptured, hasPlayerWon } = moveData;
      if (hasPlayerWon) {
        dispatch(changeTurnThunk(moveAndCapture));
        return { shouldContinue: false, moveData: null, isRewardRoll };
      }

      // logic: if it's a reward roll from a challenge, don't allow extra roll even if it's a 6
      const canRollAgain = diceNumber === 6 && !isRewardRoll;

      if (!hasTokenReachedHome && !isCaptured && !canRollAgain) {
        dispatch(changeTurnThunk(moveAndCapture));
        return { shouldContinue: false, moveData: null, isRewardRoll };
      }
      return { shouldContinue: true, moveData, isRewardRoll };
    }
    if (!isAnyTokenActiveOfColour(colour, players)) {
      if (player.isBot) await sleep(500);
      
      // logic: if it's a reward roll from a challenge, don't allow extra roll even if it's a 6
      const canRollAgain = diceNumber === 6 && !isRewardRoll;
      
      console.log(`[DEBUG] Post-Move Bonus Check (${colour}):`, {
        diceNumber,
        isRewardRoll,
        canRollAgain,
        hasTokenReachedHome: false,
        isCaptured: false
      });

      if (!canRollAgain) {
        dispatch(changeTurnThunk(moveAndCapture));
        return { shouldContinue: false, moveData: null, isRewardRoll };
      }
    }
    return { shouldContinue: true, moveData: null, isRewardRoll };
  };
};
