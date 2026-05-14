import React, { useEffect, useRef, useState } from 'react';
import { registerNewPlayer, setPlayerSequence } from '../../../../state/slices/playersSlice';
import { type TPlayerColour } from '../../../../types';
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
import styles from './Game.module.css';
import clsx from 'clsx';

export const EXIT_MESSAGE = 'Are you sure you want to exit? Any progress made will be lost.';

type Props = {
  initData: TPlayerInitData[];
};

function Game({ initData }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { draftPlayers } = useSelector((state: RootState) => state.session);
  const boardTileSize = useSelector((state: RootState) => state.board.boardTileSize);
  const { dice } = useSelector((state: RootState) => state.dice);
  const { playerSequence, isGameEnded, playerFinishOrder, currentPlayerColour, players } =
    useSelector((state: RootState) => state.players);
  const playersRegisteredInitiallyRef = useRef(true);
  const gameInactiveStartTime = useRef(0);
  const navigate = useNavigate();
  const moveAndCapture = useMoveAndCaptureToken();
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const handleExitBtnClick = () => {
    if (window.confirm('Exit the night? Progress will be lost.')) {
      navigate('/');
    }
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

  return (
    <div
      className={styles.game}
      style={
        {
          '--board-tile-size': `${boardTileSize}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.fabMenu}>
        <button 
          type="button" 
          className={styles.fabBtn} 
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
        >
          {isFullscreen ? '⛶' : '⛶'}
        </button>
        <button
          type="button"
          className={clsx(styles.fabBtn, styles.exitFabBtn)}
          onClick={handleExitBtnClick}
          title="Exit Game"
        >
          ✖
        </button>
      </div>

      <main className={styles.gameShell}>
        
        {/* TOP ZONE: Player 2 (Inverted for face-to-face) */}
        <div className={clsx(styles.playerZone, styles.playerZoneTop, currentPlayerColour === 'green' && styles.activeZone)}>
          <div className={styles.playerInfoWrap}>
            {dice.find(d => d.colour === 'green') && (
              <Dice
                colour="green"
                onDiceClick={handleDiceRoll}
                playerName=""
              />
            )}
            <div className={styles.playerInfo}>
              <span className={styles.turnAvatar} aria-hidden="true">
                {draftPlayers[1]?.token || '💎'}
              </span>
              <div>
                <strong>{players[1]?.name ?? 'Player 2'}</strong>
                <span>GREEN Player</span>
              </div>
            </div>
          </div>
        </div>

        <section className={styles.boardStage}>
          <div className={styles.boardAligner}>
            {/* Truth Deck - Top Left */}
            <div className={clsx(styles.deckMiniWrap, styles.deckTopLeft)}>
              <div className={styles.cardBackMini} />
              <div className={clsx(styles.topCardMini, styles.truthCard)}>🔮 Truth</div>
            </div>
            
            <Board />

            {/* Dare Deck - Bottom Right */}
            <div className={clsx(styles.deckMiniWrap, styles.deckBottomRight)}>
              <div className={styles.cardBackMini} />
              <div className={clsx(styles.topCardMini, styles.dareCard)}>🎭 Dare</div>
            </div>
          </div>
        </section>

        {/* BOTTOM ZONE: Player 1 */}
        <div className={clsx(styles.playerZone, styles.playerZoneBottom, currentPlayerColour === 'blue' && styles.activeZone)}>
          <div className={styles.playerInfoWrap}>
            {dice.find(d => d.colour === 'blue') && (
              <Dice
                colour="blue"
                onDiceClick={handleDiceRoll}
                playerName=""
              />
            )}
            <div className={styles.playerInfo}>
              <div>
                <strong>{players[0]?.name ?? 'Player 1'}</strong>
                <span>BLUE Player</span>
              </div>
              <span className={styles.turnAvatar} aria-hidden="true">
                {draftPlayers[0]?.token || '🔥'}
              </span>
            </div>
          </div>
        </div>

      </main>

      {isGameEnded && <GameFinishedScreen playerFinishOrder={playerFinishOrder} />}
    </div>
  );
}

export default Game;
