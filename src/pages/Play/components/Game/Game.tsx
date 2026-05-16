import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
    registerNewPlayer, 
    setPlayerSequence, 
    incrementPlayerChallenges 
} from '../../../../state/slices/playersSlice';
import { type TPlayerColour, type TPlayer, type TToken, type TDice } from '../../../../types';
import Board from '../Board/Board';
import Dice from '../Dice/Dice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../state/store';
import { registerDice } from '../../../../state/slices/diceSlice';
import { handlePostDiceRollThunk } from '../../../../state/thunks/handlePostDiceRollThunk';
import GameFinishedScreen from '../GameFinishedScreen/GameFinishedScreen';
import { changeTurnThunk } from '../../../../state/thunks/changeTurnThunk';
import { useMoveAndCaptureToken } from '../../../../hooks/useMoveAndCaptureToken';
import type { TPlayerInitData } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { playerCountToWord } from '../../../../game/players/logic';
import { usePageLeaveBlocker } from '../../../../hooks/usePageLeaveBlocker';
import { addToGameInactiveTime, setGameStartTime } from '../../../../state/slices/sessionSlice';
import { forceDiceNumber } from '../../../../state/slices/diceSlice';
import { 
    type TChallengeType, 
    setActiveChallenge, 
    setLevel, 
    markCardAsUsed,
    clearUsedCards
} from '../../../../state/slices/boardSlice';
import ForeplayActionModal from '../ForeplayActionModal/ForeplayActionModal';
import CaptureActionModal from '../CaptureActionModal/CaptureActionModal';
import ExitConfirmationModal from '../ExitConfirmationModal/ExitConfirmationModal';
import HeatMeter from '../HeatMeter/HeatMeter';
import { PokerCardBack } from '../../../../components/ChallengeVisuals';
import styles from './Game.module.css';
import clsx from 'clsx';
import type { TVibe } from '../../../../state/slices/sessionSlice';

export const EXIT_MESSAGE = 'Are you sure you want to exit? Any progress made will be lost.';

type Props = {
  initData: TPlayerInitData[];
};

function Game({ initData }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { vibe, draftPlayers } = useSelector((state: RootState) => state.session);
  const boardTileSize = useSelector((state: RootState) => state.board.boardTileSize);
  const { dice } = useSelector((state: RootState) => state.dice);
  const { players, playerSequence, isGameEnded, playerFinishOrder, currentPlayerColour } =
    useSelector((state: RootState) => state.players);
  
  const player1Progress = players.find((p: TPlayer) => p.colour === playerSequence[0])?.completedChallengesCount || 0;
  const player2Progress = players.find((p: TPlayer) => p.colour === playerSequence[1])?.completedChallengesCount || 0;

  const playersRegisteredInitiallyRef = useRef(true);
  const gameInactiveStartTime = useRef(0);
  const navigate = useNavigate();
  const moveAndCapture = useMoveAndCaptureToken();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isFabVisible, setIsFabVisible] = useState(true);
  const fabTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetFabTimeout = useCallback(() => {
    setIsFabVisible(true);
    if (fabTimeoutRef.current) clearTimeout(fabTimeoutRef.current);
    fabTimeoutRef.current = setTimeout(() => {
      setIsFabVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    resetFabTimeout();
    window.addEventListener('mousemove', resetFabTimeout);
    window.addEventListener('touchstart', resetFabTimeout);
    window.addEventListener('click', resetFabTimeout);
    return () => {
      window.removeEventListener('mousemove', resetFabTimeout);
      window.removeEventListener('touchstart', resetFabTimeout);
      window.removeEventListener('click', resetFabTimeout);
      if (fabTimeoutRef.current) clearTimeout(fabTimeoutRef.current);
    };
  }, [resetFabTimeout]);

  usePageLeaveBlocker(!isGameEnded && import.meta.env.PROD);
  
  useEffect(() => {
    if (initData.length === 0) return;
    dispatch(setPlayerSequence({ playerCount: playerCountToWord(initData.length) }));
    dispatch(setGameStartTime(Date.now()));
  }, [dispatch, initData.length]);

  useEffect(() => {
    if (initData.length === 0) return;
    for (let i = 0; i < initData.length; i++) {
      if (!playerSequence.length || !playersRegisteredInitiallyRef.current) return;
      dispatch(
        registerNewPlayer({
          name: initData[i].name,
          colour: playerSequence[i],
          isBot: initData[i].isBot,
        })
      );
      dispatch(registerDice(playerSequence[i]));
    }
    playersRegisteredInitiallyRef.current = false;
  }, [dispatch, playerSequence, initData]);

  useEffect(() => {
    const handlePageVisibilityChange = () => {
      if (isGameEnded) return;
      if (document.visibilityState === 'hidden') {
        gameInactiveStartTime.current = Date.now();
      } else if (document.visibilityState === 'visible' && gameInactiveStartTime.current > 0) {
        const now = Date.now();
        dispatch(addToGameInactiveTime(now - gameInactiveStartTime.current));
        gameInactiveStartTime.current = 0;
      }
    };
    document.addEventListener('visibilitychange', handlePageVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handlePageVisibilityChange);
  }, [dispatch, isGameEnded]);

  useEffect(() => {
    if (currentPlayerColour || players.length === 0 || initData.length === 0) return;
    dispatch(changeTurnThunk(moveAndCapture));
  }, [currentPlayerColour, dispatch, initData.length, moveAndCapture, players.length]);

  const handleDiceRoll = (colour: TPlayerColour, diceNumber: number) => {
    if (initData.length === 0) return;
    dispatch(handlePostDiceRollThunk(colour, diceNumber, moveAndCapture));
  };

  const handleChallengeComplete = (type: TChallengeType, performerColour: TPlayerColour, isManual?: boolean) => {
    if (!isManual) return; // Natural landings don't get bonus dice

    dispatch(incrementPlayerChallenges(performerColour));

    const bonusDice = type === 'dare' ? 6 : 3;
    dispatch(forceDiceNumber({ colour: performerColour, number: bonusDice, isReward: true }));
    // Pass true as a 4th param to indicate this is a reward roll from a challenge
    dispatch(handlePostDiceRollThunk(performerColour, bonusDice, moveAndCapture, true));
  };

  const handleExitBtnClick = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    setShowExitModal(false);
    navigate('/');
  };

  const triggerInstantWinTest = () => {
    if (import.meta.env.PROD) return;
    
    // Move all P1 tokens to home except one step away
    const p1 = players[0];
    if (!p1) return;
    
    dispatch(forceDiceNumber({ colour: p1.colour, number: 6 }));
    
    // This is for dev testing only - bypasses rules to force a win screen
    import('../../../../state/slices/playersSlice').then(m => {
        p1.tokens.forEach(t => {
            dispatch(m.markTokenAsReachedHome({ colour: p1.colour, id: t.id }));
        });
    });
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const [pendingManualChallenge, setPendingManualChallenge] = useState<TChallengeType | null>(null);

  const { activeChallenge, currentLevel, usedCards } = useSelector(
    (state: RootState) => state.board
  );

  const handleManualDeckClick = (type: TChallengeType) => {
    // Only allow clicking if it's currently a player's turn (not a bot)
    const currentPlayerObj = players.find((p: TPlayer) => p.colour === currentPlayerColour);
    if (!currentPlayerObj || currentPlayerObj.isBot) return;

    // Prevent if another challenge is pending
    if (pendingManualChallenge || activeChallenge) return;

    // Only prevent if tokens are ALREADY waiting for movement (meaning dice was already rolled)
    // We check if any token of CURRENT player is active
    const currentTokensActive = currentPlayerObj.tokens.some((t: TToken) => t.isActive);
    if (currentTokensActive) return;

    setPendingManualChallenge(type);
  };

  const confirmManualChallenge = () => {
    if (!pendingManualChallenge || !currentPlayerColour) return;

    const levelKey = `level${currentLevel}` as 'level1' | 'level2' | 'level3';

    import('../../../../game/coords/challengeData').then(({ CHALLENGE_DATA }) => {
      const typedChallengeData = CHALLENGE_DATA as Record<TVibe, Record<TChallengeType, { level1: any[]; level2: any[]; level3: any[] }>>;
      const pool = typedChallengeData[vibe as TVibe][pendingManualChallenge as TChallengeType][levelKey];
      
      // Filter out used cards
      let availableCards = pool.filter((item: any) => {
          const text = typeof item === 'string' ? item : item.text;
          return !usedCards.includes(text);
      });

      if (availableCards.length === 0) {
        dispatch(clearUsedCards());
        availableCards = pool;
      }

      const randomItem = availableCards[Math.floor(Math.random() * availableCards.length)];
      const randomText = typeof randomItem === 'string' ? randomItem : randomItem.text;
      const randomIcon = typeof randomItem === 'string' ? undefined : randomItem.icon;
      const randomIconSize = typeof randomItem === 'string' ? undefined : randomItem.iconSize;

      dispatch(
        setActiveChallenge({
          type: pendingManualChallenge,
          text: randomText,
          icon: randomIcon,
          iconSize: randomIconSize,
          playerColour: currentPlayerColour,
          isManual: true,
        })
      );

      dispatch(markCardAsUsed(randomText));

      // ONLY DARE increments the progress bar and triggers level ups
      if (pendingManualChallenge === 'dare') {
        dispatch(incrementPlayerChallenges(currentPlayerColour));

        const darePool = typedChallengeData[vibe as TVibe]['dare'][levelKey];
        const usedDareCount = darePool.filter((item: any) => {
            const text = typeof item === 'string' ? item : item.text;
            return usedCards.includes(text);
        }).length + 1;

        if (usedDareCount >= darePool.length - 3 && currentLevel < 3) {
            dispatch(setLevel(currentLevel + 1));
        }
      }

      setPendingManualChallenge(null);
    });
  };

  const cancelManualChallenge = () => {
    setPendingManualChallenge(null);
  };

  return (
    <div
      className={styles.game}
      style={
        {
          '--board-tile-size': `${boardTileSize}px`,
        } as React.CSSProperties
      }
    >
      {pendingManualChallenge && (
        <div className={styles.manualChallengeOverlay}>
          <div className={styles.manualChallengeModal}>
            <h3>Use a Special Method?</h3>
            <p>
              Take a <strong>{pendingManualChallenge.toUpperCase()}</strong> challenge now to instantly get a guaranteed dice roll of <strong>{pendingManualChallenge === 'dare' ? 6 : 3}</strong>.
            </p>
            <div className={styles.manualChallengeActions}>
              <button className={styles.btnCancel} onClick={cancelManualChallenge}>Nevermind</button>
              <button className={styles.btnConfirm} onClick={confirmManualChallenge}>Bring it on!</button>
            </div>
          </div>
        </div>
      )}

      <div className={clsx(styles.fabMenu, !isFabVisible && styles.fabMenuHidden)}>
        <button 
          type="button" 
          className={styles.fabBtn} 
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
        >
          {/* TODO: Replace ⛶ with icon/asset */}
          {isFullscreen ? '⛶' : '⛶'}
        </button>

        {/* TESTING ONLY: Instant Win Button */}
        {!import.meta.env.PROD && (
          <button
            type="button"
            className={clsx(styles.fabBtn, styles.testWinBtn)}
            onClick={triggerInstantWinTest}
            title="Dev: Instant Win"
          >
            {/* TODO: Replace 🧪 with icon/asset */}
            🧪
          </button>
        )}

        <button
          type="button"
          className={clsx(styles.fabBtn, styles.exitFabBtn)}
          onClick={handleExitBtnClick}
          title="Exit Game"
        >
          {/* TODO: Replace ✖ with icon/asset */}
          ✖
        </button>
      </div>

      <main className={styles.gameShell}>
        
        {/* TOP ZONE: Player 2 (Inverted) */}
        <div className={clsx(styles.playerZone, styles.playerZoneTop, currentPlayerColour === 'green' && styles.activeZone)}>
          <div className={styles.playerInfoWrap}>
            {dice.find((d: TDice) => d.colour === 'green') && (
              <Dice
                colour="green"
                onDiceClick={handleDiceRoll}
                playerName=""
              />
            )}
            <div className={styles.playerInfo}>
              <strong>{players[1]?.name ?? 'Player 2'}</strong>
              <span className={styles.turnAvatar} aria-hidden="true">
                {/* TODO: Replace 💎 with icon/asset */}
                {draftPlayers[1]?.token || '💎'}
              </span>
            </div>
          </div>
        </div>

        <section className={styles.boardStage}>
          <div className={styles.boardAligner}>
            {/* Left Heat Bar beside Board */}
            <div className={styles.boardSideHeatLeft}>
                <HeatMeter level={currentLevel} completedCount={player2Progress} color="#ff4d80" />
            </div>

            {/* Truth Deck - Anchored to Board Top-Left */}
            <div 
              className={clsx(styles.deckMiniWrap, styles.deckTopLeft)}
              onClick={() => handleManualDeckClick('truth')}
            >
              <div className={styles.cardStack}>
                <div className={styles.cardUnder}><PokerCardBack type="truth" /></div>
                <div className={styles.cardUnder}><PokerCardBack type="truth" /></div>
                <div className={styles.topCardMini}><PokerCardBack type="truth" /></div>
              </div>
            </div>

            <Board />

            {/* Right Heat Bar beside Board */}
            <div className={styles.boardSideHeatRight}>
                <HeatMeter level={currentLevel} completedCount={player1Progress} color="#ffd166" />
            </div>

            {/* Dare Deck - Anchored to Board Bottom-Right */}
            <div 
              className={clsx(styles.deckMiniWrap, styles.deckBottomRight)}
              onClick={() => handleManualDeckClick('dare')}
            >
              <div className={styles.cardStack}>
                <div className={styles.cardUnder}><PokerCardBack type="dare" /></div>
                <div className={styles.cardUnder}><PokerCardBack type="dare" /></div>
                <div className={styles.topCardMini}><PokerCardBack type="dare" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM ZONE: Player 1 */}
        <div className={clsx(styles.playerZone, styles.playerZoneBottom, currentPlayerColour === 'blue' && styles.activeZone)}>
          <div className={styles.playerInfoWrap}>
            {dice.find((d: TDice) => d.colour === 'blue') && (
              <Dice
                colour="blue"
                onDiceClick={handleDiceRoll}
                playerName=""
              />
            )}
            <div className={styles.playerInfo}>
              <strong>{players[0]?.name ?? 'Player 1'}</strong>
              <span className={styles.turnAvatar} aria-hidden="true">
                {/* TODO: Replace 🔥 with icon/asset */}
                {draftPlayers[0]?.token || '🔥'}
              </span>
            </div>
          </div>
        </div>

      </main>

      <ForeplayActionModal onComplete={handleChallengeComplete} />
      <CaptureActionModal />
      <ExitConfirmationModal 
        isOpen={showExitModal}
        onConfirm={confirmExit}
        onCancel={cancelExit}
      />
      {isGameEnded && <GameFinishedScreen playerFinishOrder={playerFinishOrder} />}
    </div>
  );
}

export default Game;
