import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './HowToPlay.module.css';
import { useCleanup } from '../../hooks/useCleanup';
import { motion } from 'framer-motion';

const H = ({ c }: { c: string }) => <span className={styles.icon} aria-hidden="true">{c}</span>;

const rules = [
    {
        title: "The Goal",
        icon: "🎯",
        content: "Be the first to move all 4 of your tokens into your Home Base. The winner claims the agreed Reward."
    },
    {
        title: "Strategic Challenges",
        icon: "✨",
        content: "Land on special tiles or pick from decks. Taking a challenge grants fixed moves (3 for Truth, 6 for Dare)."
    },
    {
        title: "Capturing",
        icon: "⚔️",
        content: "Capture an opponent to send them back. Choose your reward: Roll Again or Force them to draw a Dare card."
    },
    {
        title: "The Greedy Rule",
        icon: "⚠️",
        content: "Rolling a 6 three times in a row ends your turn immediately and forces a mandatory Truth challenge!"
    },
    {
        title: "Safe Zones",
        icon: "⭐",
        content: "Tokens are completely safe from being captured when they land on a Star Tile."
    },
    {
        title: "Safe Word",
        icon: "🛑",
        content: "Use the 'Finish Now' button at any time to pause or end the session instantly with no questions asked."
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
    document.title = 'Rules | Ludo Foreplay Night';
    cleanup();
  }, [cleanup]);

  return (
    <div className={styles.howToPlayContainer}>
      <header className={styles.header}>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
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
          Start Playing
        </Link>
        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default HowToPlay;
