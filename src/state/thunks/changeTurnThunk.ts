import { FORWARD_TOKEN_TRANSITION_TIME } from '../../game/tokens/constants';
import { isTokenMovable, getAvailableSteps } from '../../game/tokens/logic';
import type { AppDispatch, RootState } from '../store';
import type { useMoveAndCaptureToken } from '../../hooks/useMoveAndCaptureToken';
import { setTokenTransitionTime } from '../../utils/setTokenTransitionTime';
import { changeTurn, deactivateAllTokens } from '../slices/playersSlice';
import { handlePostDiceRollThunk } from './handlePostDiceRollThunk';
import { rollDiceThunk } from './rollDiceThunk';
import { unlockAndAlignTokens } from './unlockAndAlignTokens';
import { type TToken } from '../../types';

export function changeTurnThunk(moveAndCapture: ReturnType<typeof useMoveAndCaptureToken>) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    if (getState().players.isGameEnded) return;

    dispatch(changeTurn());
    const { currentPlayerColour, players } = getState().players;

    const { colour, isBot } = players.find((p) => p.colour === currentPlayerColour) ?? {};

    if (!isBot || !colour) return;

    const handleDiceRoll = async (diceNumber: number) => {
      const { shouldContinue, moveData: autoMoveData, isRewardRoll } =
        (await dispatch(handlePostDiceRollThunk(colour, diceNumber, moveAndCapture))) ?? {};
      dispatch(deactivateAllTokens(colour));

      const { players } = getState().players;

      const playerTokens = players.find((p) => p.colour === colour)?.tokens || [];
      if (!shouldContinue) return;
      if (autoMoveData) {
        const { hasTokenReachedHome, isCaptured } = autoMoveData;
        const canRollAgain = diceNumber === 6 && !isRewardRoll;
        if (!isCaptured && !hasTokenReachedHome && !canRollAgain) {
          return setTimeout(() => dispatch(changeTurnThunk(moveAndCapture)), 1000);
        } else {
          return setTimeout(() => dispatch(rollDiceThunk(colour, handleDiceRoll)), 1000);
        }
      }

      // Simple bot logic replacement for the deleted bot directory
      let bestToken: TToken | undefined;
      if (diceNumber === 6) {
        bestToken = playerTokens.find((t) => t.isLocked && !t.hasTokenReachedHome);
      }
      if (!bestToken) {
        const movableTokens = playerTokens.filter((t) => isTokenMovable(t, diceNumber));
        bestToken = movableTokens.sort((a, b) => getAvailableSteps(a) - getAvailableSteps(b))[0];
      }

      if (!bestToken) return;

      setTokenTransitionTime(FORWARD_TOKEN_TRANSITION_TIME, bestToken);

      if (bestToken.isLocked && !bestToken.hasTokenReachedHome && diceNumber === 6) {
        dispatch(unlockAndAlignTokens({ colour, id: bestToken.id }));
        const canRollAgain = !isRewardRoll;
        if (canRollAgain) {
            return setTimeout(() => dispatch(rollDiceThunk(colour, handleDiceRoll)), 1000);
        } else {
            return setTimeout(() => dispatch(changeTurnThunk(moveAndCapture)), 1000);
        }
      }
      const moveData = await moveAndCapture(bestToken, diceNumber);
      if (!moveData) return dispatch(changeTurnThunk(moveAndCapture));
      const { hasTokenReachedHome, isCaptured, hasPlayerWon } = moveData;
      if (hasPlayerWon) return setTimeout(() => dispatch(changeTurnThunk(moveAndCapture)), 1000);
      
      const canRollAgain = diceNumber === 6 && !isRewardRoll;
      if (!isCaptured && !hasTokenReachedHome && !canRollAgain) {
        return setTimeout(() => dispatch(changeTurnThunk(moveAndCapture)), 1000);
      } else {
        return setTimeout(() => dispatch(rollDiceThunk(colour, handleDiceRoll)), 1000);
      }
    };
    dispatch(rollDiceThunk(colour, handleDiceRoll));
  };
}
