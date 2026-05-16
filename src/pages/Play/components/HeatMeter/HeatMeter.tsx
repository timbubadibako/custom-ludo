import styles from './HeatMeter.module.css';
import { motion } from 'framer-motion';

type Props = {
  level: number;
  completedCount: number;
  color?: string;
};

function HeatMeter({ level, completedCount, color }: Props) {
  // Logic: 1/50 per card.
  const progress = Math.min((completedCount / 50) * 100, 100);
  
  const displayColor = color || (level === 1 ? '#ffb2bf' : level === 2 ? '#ffd166' : '#ff4d80');

  return (
    <div className={styles.heatMeter}>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          style={{ '--progress-width': `${progress}%` } as React.CSSProperties}
          animate={{
            height: `${progress}%`,
            backgroundColor: displayColor,
            boxShadow: `0 0 20px ${displayColor}`
          }}
          transition={{ type: 'spring', stiffness: 40, damping: 15 }}
        />
      </div>
    </div>
  );
}

export default HeatMeter;
