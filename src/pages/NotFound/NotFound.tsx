import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import { useEffect } from 'react';
import { useCleanup } from '../../hooks/useCleanup';
import { motion } from 'framer-motion';

function NotFound() {
  const cleanup = useCleanup();

  useEffect(() => {
    document.title = '404 Not Found | LibreLudo';
    return () => cleanup();
  }, [cleanup]);

  return (
    <div className={styles.notFoundContainer}>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={styles.notFoundDialog}
      >
        <h1>404</h1>
        {/* TODO: Replace 🎲 with icon/asset */}
        <p className={styles.oops}>🎲 Wrong Roll!</p>
        <p className={styles.message}>This path leads nowhere. Let's get back to the session.</p>
        <Link className={styles.goToHomeBtn} to="/">
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
