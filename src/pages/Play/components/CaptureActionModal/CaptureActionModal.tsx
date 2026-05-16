import { useDispatch, useSelector } from 'react-redux';
import {
  deactivateAllTokens,
} from '../../../../state/slices/playersSlice';
import type { RootState } from '../../../../state/store';
import { 
    setPendingCapture, 
    setActiveChallenge
} from '../../../../state/slices/boardSlice';
import type { TPlayer } from '../../../../types';
import { type TVibe } from '../../../../state/slices/sessionSlice';
import styles from './CaptureActionModal.module.css';

function CaptureActionModal() {
  const dispatch = useDispatch();
  const { players } = useSelector((state: RootState) => state.players);
  const { pendingCapture, currentLevel } = useSelector((state: RootState) => state.board);
  const { vibe } = useSelector((state: RootState) => state.session);

  if (!pendingCapture) return null;

  const opponent = players.find((p: TPlayer) => p.colour === pendingCapture.opponentColour);

  const handleRollAgain = () => {
    const currentPlayerColour = pendingCapture.tokenColour;
    dispatch(setPendingCapture(null));
    dispatch(deactivateAllTokens(currentPlayerColour));
  };

  const handleForceDare = () => {
    const currentPlayerColour = pendingCapture.tokenColour;

    dispatch(setPendingCapture(null));
    dispatch(deactivateAllTokens(currentPlayerColour));
    
    import('../../../../game/coords/challengeData').then(({ CHALLENGE_DATA }) => {
        const levelKey = `level${currentLevel}` as 'level1' | 'level2' | 'level3';
        const pool = CHALLENGE_DATA[vibe as TVibe]['dare'][levelKey];
        const randomText = pool[Math.floor(Math.random() * pool.length)];
        
        dispatch(setActiveChallenge({
            type: 'dare',
            text: randomText,
            playerColour: currentPlayerColour,
            isManual: false
        }));
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Busted! 😈</h2>
        <p className={styles.message}>
          You captured <strong>{opponent?.name}</strong>'s token!
        </p>
        
        <div className={styles.choiceBody}>
            <p>What is your choice of victory?</p>
        </div>

        <div className={styles.actions}>
            <button className={styles.btnSecondary} onClick={handleRollAgain}>
                <span className={styles.icon}>🎲</span>
                Take Bonus Roll
            </button>
            <div className={styles.divider}>OR</div>
            <button className={styles.btnPrimary} onClick={handleForceDare}>
                <span className={styles.icon}>🔥</span>
                Force a Dare!
            </button>
        </div>
      </div>
    </div>
  );
}

export default CaptureActionModal;
