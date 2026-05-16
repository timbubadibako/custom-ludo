import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState, AppDispatch } from '../../../../state/store';
import { clearActiveChallenge } from '../../../../state/slices/boardSlice';
import { deactivateAllTokens, changeTurn } from '../../../../state/slices/playersSlice';
import { resetDice } from '../../../../state/slices/diceSlice';
import styles from './ForeplayActionModal.module.css';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import type { TChallengeType } from '../../../../state/slices/boardSlice';
import type { TPlayerColour, TPlayer } from '../../../../types';
import { playSFX, SFX } from '../../../../utils/audio';
import { changeTurnThunk } from '../../../../state/thunks/changeTurnThunk';
import { useMoveAndCaptureToken } from '../../../../hooks/useMoveAndCaptureToken';

type Props = {
  onComplete: (type: TChallengeType, performerColour: TPlayerColour, isManual?: boolean) => void;
};

function ForeplayActionModal({ onComplete }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { activeChallenge } = useSelector((state: RootState) => state.board);
  const { players } = useSelector((state: RootState) => state.players);
  const [showPenalty, setShowPenalty] = useState(false);
  const moveAndCapture = useMoveAndCaptureToken();

  useEffect(() => {
    if (activeChallenge) {
        playSFX(SFX.CHALLENGE_OPEN);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowPenalty(false);
    }
  }, [activeChallenge?.text, activeChallenge]);

  const player = players.find((p: TPlayer) => p.colour === activeChallenge?.playerColour);

  const getTitle = () => {
    // TODO: Replace scale emoji with themed SVG icon
    if (showPenalty) return '⚖️ PENALTY TIME';
    if (!activeChallenge) return '';
    if (activeChallenge.title) return activeChallenge.title;
    switch (activeChallenge.type) {
      // TODO: Replace crystal ball emoji with themed SVG icon
      case 'truth': return '🔮 Truth Revealed';
      // TODO: Replace mask emoji with themed SVG icon
      case 'dare': return '🎭 Spicy Dare';
      default: return 'Challenge';
    }
  };

  const handleComplete = () => {
    if (!activeChallenge) return;
    const { type, playerColour, isManual } = activeChallenge;
    dispatch(clearActiveChallenge());
    onComplete(type, playerColour, isManual);
  };

  const handleSkip = () => {
    setShowPenalty(true);
  };

  const handleAcceptPenalty = () => {
    if (!activeChallenge) return;

    const currentColour = activeChallenge.playerColour;

    // 1. KILL the dice and tokens for this player immediately to block bonus roll
    dispatch(resetDice(currentColour));
    dispatch(deactivateAllTokens(currentColour));

    // 2. Change turn IMMEDIATELY using reducer (synchronous state update)
    dispatch(changeTurn());

    // 3. Close the modal
    dispatch(clearActiveChallenge());
    
    // 4. Reset local state
    setShowPenalty(false);
    
    // 5. Still call thunk in case there's bot logic to trigger for the next player
    dispatch(changeTurnThunk(moveAndCapture));
  };

  return (
    <AnimatePresence mode="wait">
      {activeChallenge && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
        >
            <motion.div 
            key={showPenalty ? 'penalty' : activeChallenge.text} 
            initial={{ 
                scale: 0, 
                opacity: 0, 
                rotateY: 180,
                rotateZ: activeChallenge.playerColour === 'green' ? 180 : 0,
                y: activeChallenge.playerColour === 'green' ? -500 : 500
            }}
            animate={{ 
                scale: 1, 
                opacity: 1, 
                rotateY: 0,
                rotateZ: activeChallenge.playerColour === 'green' ? 180 : 0,
                y: 0
            }}
            exit={{ 
                scale: 0, 
                opacity: 0,
                rotateZ: activeChallenge.playerColour === 'green' ? 195 : -15,
                y: activeChallenge.playerColour === 'green' ? -500 : 500,
            }}
            transition={{ 
                type: 'spring', 
                damping: 20, 
                stiffness: 70,
                duration: 0.8 
            }}
            className={clsx(
                styles.modalContent, 
                showPenalty ? styles.penalty : styles[activeChallenge.type]
            )}
            >
            <p className={styles.playerTurn}>{player?.name}'s {showPenalty ? 'Penalty' : 'Challenge'}</p>
            <h2 className={styles.title}>{getTitle()}</h2>
            
            <div className={styles.cardBody}>
                {!showPenalty ? (
                    <>
                        {activeChallenge.icon && (
                            <div className={styles.iconContainer}>
                                <img 
                                    src={activeChallenge.icon} 
                                    alt="Challenge visual" 
                                    style={{ width: activeChallenge.iconSize || 120, height: 'auto' }}
                                />
                            </div>
                        )}
                        <p className={styles.challengeText}>{activeChallenge.text}</p>
                    </>
                ) : (
                    <div className={styles.penaltyContent}>
                        <p className={styles.penaltyMsg}>Dare Rejected!</p>
                        <p className={styles.penaltyInstruction}>Let your partner give you a replacement penalty for this instruction. 😈</p>
                    </div>
                )}
            </div>

            <div className={styles.actions}>
                {!showPenalty ? (
                    <>
                        <button className={styles.doneBtn} onClick={handleComplete}>
                            Task Completed
                        </button>
                        <button className={styles.skipBtn} onClick={handleSkip}>
                            Skip & Take Penalty
                        </button>
                    </>
                ) : (
                    <button className={styles.doneBtn} onClick={handleAcceptPenalty}>
                        Penalty Accepted
                    </button>
                )}
            </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ForeplayActionModal;
