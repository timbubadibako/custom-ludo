import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { motion } from 'framer-motion';

function Navbar() {
  const location = useLocation();
  
  // Do not show Navbar on the Play page
  if (location.pathname === '/play') return null;

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>
          {/* TODO: Replace 🎲 with icon/asset */}
          <span className={styles.diceIcon}>🎲</span>
          <span className={styles.logoText}>LibreLudo</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link 
            to="/" 
            className={location.pathname === '/' ? styles.active : ''}
          >
            Home
          </Link>
          <Link 
            to="/how-to-play" 
            className={location.pathname === '/how-to-play' ? styles.active : ''}
          >
            Rules
          </Link>
          <Link 
            to="/setup" 
            className={styles.playBtn}
          >
            New Session
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
