import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../state/store';
import { setPendingCapture, setActiveChallenge } from '../../../../state/slices/boardSlice';
import { deactivateAllTokens } from '../../../../state/slices/playersSlice';
import { changeTurnThunk } from '../../../../state/thunks/changeTurnThunk';
import { useMoveAndCaptureToken } from '../../../../hooks/useMoveAndCaptureToken';
import styles from './CaptureActionModal.module.css';
import { motion, AnimatePresence } from 'framer-motion';

function CaptureActionModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { pendingCapture, currentLevel } = useSelector((state: RootState) => state.board);
  const { players } = useSelector((state: RootState) => state.players);
  const { vibe } = useSelector((state: RootState) => state.session);
  const moveAndCapture = useMoveAndCaptureToken();

  if (!pendingCapture) return null;

  const opponent = players.find(p => p.colour === pendingCapture.opponentColour);

  const handleRollAgain = () => {
    const currentPlayerColour = pendingCapture.tokenColour;
    dispatch(setPendingCapture(null));
    dispatch(deactivateAllTokens(currentPlayerColour));
  };

  const handleForceDare = () => {
    const opponentColour = pendingCapture.opponentColour;
    const currentPlayerColour = pendingCapture.tokenColour;

    dispatch(setPendingCapture(null));
    dispatch(deactivateAllTokens(currentPlayerColour));
    
    import('../../../../game/coords/challengeData').then(({ CHALLENGE_DATA }) => {
        const levelKey = `level${currentLevel}` as 'level1' | 'level2' | 'level3';
        const pool = CHALLENGE_DATA[vibe]['dare'][levelKey];
        const randomText = pool[Math.floor(Math.random() * pool.length)];
        
        dispatch(setActiveChallenge({
            type: 'dare',
            text: randomText,
            playerColour: opponentColour,
            isManual: false 
        }));
        
        // Use setTimeout to ensure state updates propagate before turn changes
        setTimeout(() => {
            dispatch(changeTurnThunk(moveAndCapture));
        }, 100);
    });
  };

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className={styles.modalContent}
        >
          <h2 className={styles.title}>⚔️ Token Captured!</h2>
          <p className={styles.description}>
            You just captured <strong>{opponent?.name || opponent?.colour}</strong>'s token! 
            Choose your reward:
          </p>
          
          <div className={styles.actions}>
            <button 
              className={styles.rollBtn}
              onClick={handleRollAgain}
            >
              <span className={styles.icon}>🎲</span>
              <div className={styles.btnText}>
                <strong>Roll Again</strong>
                <span>Take another turn</span>
              </div>
            </button>

            <button 
              className={styles.dareBtn}
              onClick={handleForceDare}
            >
              <span className={styles.icon}>🎭</span>
              <div className={styles.btnText}>
                <strong>Force Dare</strong>
                <span>Make them do a challenge</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CaptureActionModal;
