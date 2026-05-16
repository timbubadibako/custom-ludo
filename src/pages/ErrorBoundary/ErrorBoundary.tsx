import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './ErrorBoundary.module.css';
import { useEffect } from 'react';
import { useCleanup } from '../../hooks/useCleanup';
import { motion } from 'framer-motion';

function ErrorBoundary() {
  const error = useRouteError();
  const cleanup = useCleanup();

  const getError = (error: unknown) => {
    if (isRouteErrorResponse(error)) {
      return (
        <>
          <p>
            {error.status} {error.statusText}
          </p>
          <p>{error.data}</p>
        </>
      );
    } else if (error instanceof Error) {
      return (
        <div>
          <p>{error.message}</p>
          <pre>{error.stack}</pre>
        </div>
      );
    } else {
      return <p>Unknown Error</p>;
    }
  };

  useEffect(() => {
    document.title = 'Oops! Error Occurred';
    return () => cleanup();
  }, [cleanup]);

  return (
    <div className={styles.errorContainer}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={styles.errorDialog}
      >
        <div>
          <p className={styles.oops}>
            <span>Oops!</span> Session Interrupted
          </p>
          <p className={styles.message}>
            An unexpected error occurred. Don't worry, your progress might still be saved.
          </p>
        </div>
        <button
          className={styles.startNewGameBtn}
          onClick={() => (window.location.href = '/')}
        >
          Restart Session
        </button>
        <details className={styles.errorDetails}>
          <summary>Show Technical Details</summary>
          <div className={styles.errorContent}>{getError(error)}</div>
        </details>
      </motion.div>
    </div>
  );
}

export default ErrorBoundary;
