import { useCallback, useEffect, useMemo, useState } from 'react';
import PlayerInput from './components/PlayerInput/PlayerInput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import type { TPlayerInitData } from '../../types';
import { ToastContainer, toast } from 'react-toastify';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { useCleanup } from '../../hooks/useCleanup';
import { playerCountToWord } from '../../game/players/logic';
import { playerSequences } from '../../game/players/constants';
import HomeIcon from '../../assets/icons/home.svg?react';
import styles from './PlayerSetup.module.css';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import type { RootState } from '../../state/store';
import { 
  setVibe, 
  setReward,
  updateDraftPlayer, 
  type TVibe 
} from '../../state/slices/sessionSlice';

const PLAYER_NAME_EMPTY_TOAST_ID = 'player-name-empty';

const vibeModes = [
  { name: 'Romantic' as TVibe, icon: '💗' }, // TODO: Replace heart emoji with themed SVG
  { name: 'Fun' as TVibe, icon: '🎲' },      // TODO: Replace dice emoji with themed SVG
  { name: 'Naughty' as TVibe, icon: '🔥' },   // TODO: Replace fire emoji with themed SVG
];

function PlayerSetup() {
  const dispatch = useDispatch();
  const { vibe, reward, draftPlayers } = useSelector((state: RootState) => state.session);
  
  const [playerCount] = useState(2);
  const [dialogWidth, setDialogWidth] = useState(0);
  
  const [playersData, setPlayersData] = useState<TPlayerInitData[]>(() => {
    const initial = [
      { name: 'Player 1', isBot: false },
      { name: 'Player 2', isBot: false },
    ];
    draftPlayers.forEach((dp, i) => {
      if (initial[i]) initial[i].name = dp.name;
    });
    return initial;
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [dialogNode, setDialogNode] = useState<HTMLElement | null>(null);
  const cleanup = useCleanup();
  
  const playerSequence = useMemo(
    () => playerSequences[playerCountToWord(playerCount)],
    [playerCount]
  );

  useEffect(() => {
    document.title = 'Setup | Ludo Foreplay Night';
    cleanup();
  }, [cleanup]);

  const onResize = useCallback(() => {
    if (!dialogNode) return;
    const dialogWidth = dialogNode.getBoundingClientRect().width;
    setDialogWidth(dialogWidth);
  }, [dialogNode]);

  useResizeObserver(dialogNode, onResize);

  const handlePlayBtnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const playerInitData = playersData.slice(0, playerCount);
    const isAnyNameEmpty = playerInitData.some(
      (d) => d.name === '' || [...d.name].every((c) => c === ' ')
    );
    if (isAnyNameEmpty)
      return toast('Player name must not be empty', {
        type: 'error',
        toastId: PLAYER_NAME_EMPTY_TOAST_ID,
      });

    setIsLoading(true);
    navigate('/play', { 
      state: { 
        initData: playerInitData,
        vibe,
        reward
      } 
    });
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className={styles.playerSetup}>
      <div className={styles.topActions}>
        <Link to="/" className={styles.iconBtn} title="Home">
          <HomeIcon />
        </Link>
        <a 
          href="https://github.com/priyanshurav/libreludo" 
          target="_blank" 
          rel="noreferrer" 
          className={styles.iconBtn}
          title="GitHub"
        >
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
      </div>

      <div className={styles.setupLayout}>
        <main
          className={styles.playerSetupDialog}
          ref={setDialogNode}
          style={
            {
              '--dialog-width': `${dialogWidth}px`,
              '--player-count': playerCount,
            } as React.CSSProperties
          }
        >
          <section className={styles.setupIntro}>
            <p className={styles.setupKicker}>{vibe.toUpperCase()} MODE</p>
            <h1>Confirm the players.</h1>
          </section>

          <section className={styles.vibeQuickSelect}>
            {vibeModes.map(mode => (
              <button
                key={mode.name}
                className={clsx(styles.vibeChip, vibe === mode.name && styles.vibeChipActive)}
                onClick={() => dispatch(setVibe(mode.name))}
              >
                {mode.icon} {mode.name}
              </button>
            ))}
          </section>
          
          <div className={styles.playerCountSelector}>
            <button className={clsx(styles.playerCountBtn, styles.playerCountActive)}>
              2 Players
            </button>
            <button className={clsx(styles.playerCountBtn, styles.playerCountLocked)} disabled>
              4 Players (Locked)
            </button>
          </div>

          <div className={styles.playerInputs}>
            {playerSequence.map((c, index) => (
              <PlayerInput
                key={index}
                colour={c}
                name={playersData[index].name}
                /* TODO: Use Male/Female SVG icons instead of text placeholders */
                token={draftPlayers[index]?.token || (index === 0 ? 'Male' : 'Female')}
                onNameChange={(name) => {
                  const newData = playersData.map((d, i) => (i === index ? { ...d, name } : d));
                  setPlayersData(newData);
                  dispatch(updateDraftPlayer({ index, data: { name } }));
                }}
                onTokenChange={(token) => {
                  dispatch(updateDraftPlayer({ index, data: { token } }));
                  // Auto-opposite logic for 2 players
                  const otherIndex = index === 0 ? 1 : 0;
                  const otherToken = token === 'Male' ? 'Female' : 'Male';
                  dispatch(updateDraftPlayer({ index: otherIndex, data: { token: otherToken } }));
                }}
              />
            ))}
          </div>

          <small className={styles.version}>v2.0.1</small>
        </main>

        {/* Reward Sidebar Panel */}
        <aside className={styles.rewardPanel}>
          <p className={styles.setupKicker}>REWARD</p>
          <textarea 
            className={styles.rewardInput} 
            value={reward}
            onChange={(e) => dispatch(setReward(e.target.value))}
            placeholder="What does the winner get?"
          />
          <p className={styles.setupNote}>This will be revealed at the end.</p>
          
          <Link className={styles.playBtn} to="/play" onClick={handlePlayBtnClick}>
            PLAY
          </Link>
        </aside>
      </div>

      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}

export default PlayerSetup;
