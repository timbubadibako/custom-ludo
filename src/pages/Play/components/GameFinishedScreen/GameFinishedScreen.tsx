import type { TPlayerNameAndColour, TPlayer } from '../../../../types';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import GameFinishPlayerItem from '../GameFinishPlayerItem/GameFinishPlayerItem';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../state/store';
import styles from './GameFinishedScreen.module.css';

import { useEffect } from 'react';
import { playSFX, SFX } from '../../../../utils/audio';

type Props = {
  playerFinishOrder: TPlayerNameAndColour[];
};

function GameFinishedScreen({ playerFinishOrder }: Props) {
  const { width, height } = useWindowSize();
  const { reward } = useSelector((state: RootState) => state.session);
  const { players } = useSelector((state: RootState) => state.players);

  useEffect(() => {
    playSFX(SFX.VICTORY);
  }, []);

  const winner = playerFinishOrder[0];
  const winnerData = players.find((p: TPlayer) => p.colour === winner?.colour);

  return (
    <AnimatePresence>
      <motion.div className={styles.gameFinishedScreen}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.gameFinishedBackdrop}
        />
        <Confetti 
          width={width} 
          height={height} 
          style={{ zIndex: 20 }} 
          colors={['#ff4d80', '#ffd166', '#ffb2bf', '#4d80ff']}
          numberOfPieces={200}
        />
        <motion.div
          className={styles.gameFinishedDialog}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <p className={styles.gameFinishedKicker}>Victory Claimed</p>
          <h1 className={styles.gameFinishedText}>SESSION COMPLETE!</h1>
          
          <motion.div 
            className={styles.rewardSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className={styles.rewardLabel}>Winner's Spicy Reward:</p>
            <div className={styles.rewardCard}>
              <span className={styles.rewardIcon}>🏆</span>
              <p className={styles.rewardText}>{reward || "A night of passion and bliss"}</p>
            </div>
            <p className={styles.congratsText}>
              Congratulations, <strong>{winnerData?.name || winner?.name}</strong>! Your partner must now fulfill your wish.
            </p>
          </motion.div>

          <section className={styles.gameResult}>
            <p className={styles.statsLabel}>Final Rankings</p>
            {playerFinishOrder.map((p, i) => (
              <GameFinishPlayerItem
                colour={p.colour}
                isLast={i === playerFinishOrder.length - 1}
                name={p.name}
                rank={i + 1}
                key={i}
              />
            ))}
          </section>

          <div className={styles.actions}>
            <Link className={styles.playAgainBtn} to="/setup">
              Start New Session
            </Link>
            <Link className={styles.homeBtn} to="/">
              Back to Menu
            </Link>
          </div>
          
          <p className={styles.gameFinishedNote}>
            The game may end here, but your evening is just getting started. Enjoy your reward! 🔥
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GameFinishedScreen;
