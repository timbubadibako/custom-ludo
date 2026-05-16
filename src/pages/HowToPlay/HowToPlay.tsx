import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './HowToPlay.module.css';
import { useCleanup } from '../../hooks/useCleanup';
import { motion } from 'framer-motion';

const H = ({ c }: { c: string }) => <span className={styles.icon} aria-hidden="true">{c}</span>;

const rules = [
    {
        title: "Objective",
        // TODO: Replace 🎯 with icon/asset
        icon: "🎯",
        content: "Move all 4 of your tokens into the Home Base. The winner gets the agreed 'Spicy Reward'."
    },
    {
        title: "Challenges",
        // TODO: Replace 🔥 with icon/asset
        icon: "🔥",
        content: "Landing on Truth or Dare tiles triggers a challenge. Completing a DARE advances your Heat Bar and Level."
    },
    {
        title: "Heat Meter",
        // TODO: Replace 🌡️ with icon/asset
        icon: "🌡️",
        content: "Only DARE challenges increase your meter. Higher levels unlock more intense (Naughty) content."
    },
    {
        title: "Skip & Penalty",
        // TODO: Replace ⚖️ with icon/asset
        icon: "⚖️",
        content: "Too scared for a Dare? You can skip, but your partner will give you a custom replacement penalty!"
    },
    {
        title: "Strategic Moves",
        // TODO: Replace 🎲 with icon/asset
        icon: "🎲",
        content: "Taking a challenge grants fixed dice: 6 for Dare, 3 for Truth. Use them wisely to reach home faster."
    },
    {
        title: "Safe Zones",
        // TODO: Replace ⭐ with icon/asset
        icon: "⭐",
        content: "Star tiles are safe zones. You cannot be captured while resting on a Star."
    }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function HowToPlay() {
  const cleanup = useCleanup();
  useEffect(() => {
    document.title = 'Rules | LibreLudo';
    return () => cleanup();
  }, [cleanup]);

  return (
    <div className={styles.howToPlayContainer}>
      <header className={styles.header}>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* TODO: Replace 🎲 with icon/asset */}
          <H c="🎲" /> Rulebook
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.subtitle}
        >
          Master the art of the game and the night.
        </motion.p>
      </header>

      <motion.main 
        className={styles.rulesGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {rules.map((rule, i) => (
          <motion.section 
            key={i} 
            className={styles.ruleCard}
            variants={itemVariants}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>{rule.icon}</span>
              <h2>{rule.title}</h2>
            </div>
            <p>{rule.content}</p>
          </motion.section>
        ))}
      </motion.main>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={styles.actions}
      >
        <Link to="/setup" className={styles.backLink}>
          Start Session
        </Link>
        <Link to="/" className={styles.homeLink}>
          Back to Menu
        </Link>
      </motion.div>
    </div>
  );
}

export default HowToPlay;
