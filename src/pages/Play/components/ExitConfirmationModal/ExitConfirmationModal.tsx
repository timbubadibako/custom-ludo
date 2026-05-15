import styles from './ExitConfirmationModal.module.css';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

function ExitConfirmationModal({ isOpen, onConfirm, onCancel }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={styles.modalContent}
          >
            <h2 className={styles.title}>Finish the Session?</h2>
            <p className={styles.description}>
                Are you sure you want to end the game early? 
                Your current progress and challenge history will be lost.
            </p>
            
            <div className={styles.actions}>
              <button 
                className={styles.cancelBtn}
                onClick={onCancel}
              >
                Keep Playing
              </button>
              <button 
                className={styles.confirmBtn}
                onClick={onConfirm}
              >
                Finish Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ExitConfirmationModal;
