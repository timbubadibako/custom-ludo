import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../../../../state/store';
import { clearActiveChallenge } from '../../../../state/slices/boardSlice';
import styles from './ForeplayActionModal.module.css';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import type { TChallengeType } from '../../../../state/slices/boardSlice';
import type { TPlayerColour } from '../../../../types';
import { playSFX, SFX } from '../../../../utils/audio';

type Props = {
  onComplete: (type: TChallengeType, performerColour: TPlayerColour, isManual?: boolean) => void;
};

function ForeplayActionModal({ onComplete }: Props) {
  const dispatch = useDispatch();
  const { activeChallenge } = useSelector((state: RootState) => state.board);
  const { players } = useSelector((state: RootState) => state.players);

  useEffect(() => {
    if (activeChallenge) {
        playSFX(SFX.CHALLENGE_OPEN);
    }
  }, [activeChallenge]);

  if (!activeChallenge) return null;

  const player = players.find(p => p.colour === activeChallenge.playerColour);

  const getTitle = () => {
    switch (activeChallenge.type) {
      case 'truth': return '🔮 Truth Revealed';
      case 'dare': return '🎭 Spicy Dare';
      default: return 'Challenge';
    }
  };

  const handleComplete = () => {
    const { type, playerColour, isManual } = activeChallenge;
    dispatch(clearActiveChallenge());
    onComplete(type, playerColour, isManual);
  };

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className={clsx(
            styles.modalContent, 
            styles[activeChallenge.type],
            activeChallenge.playerColour === 'green' && styles.modalInverted
          )}
        >
          <p className={styles.playerTurn}>{player?.name}'s Challenge</p>
          <h2 className={styles.title}>{getTitle()}</h2>
          
          <div className={styles.cardBody}>
            <p className={styles.challengeText}>{activeChallenge.text}</p>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.doneBtn}
              onClick={handleComplete}
            >
              Challenge Completed
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ForeplayActionModal;
