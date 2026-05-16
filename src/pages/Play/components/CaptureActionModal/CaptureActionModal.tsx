import { useDispatch, useSelector } from 'react-redux';
import {
  deactivateAllTokens,
} from '../../../../state/slices/playersSlice';
import type { RootState } from '../../../../state/store';
import { 
    setPendingCapture, 
    setActiveChallenge
} from '../../../../state/slices/boardSlice';
import type { TPlayer } from '../../../../types';
import { type TVibe } from '../../../../state/slices/sessionSlice';
import { CHALLENGE_DATA, type TChallengeItem } from '../../../../game/coords/challengeData';
import { type TChallengeType } from '../../../../state/slices/boardSlice';
import styles from './CaptureActionModal.module.css';

function CaptureActionModal() {
  const dispatch = useDispatch();
  const { players } = useSelector((state: RootState) => state.players);
  const { pendingCapture, currentLevel, usedCards } = useSelector((state: RootState) => state.board);
  const { vibe } = useSelector((state: RootState) => state.session);

  if (!pendingCapture) return null;

  const opponent = players.find((p: TPlayer) => p.colour === pendingCapture.opponentColour);

  const handleRollAgain = () => {
    const currentPlayerColour = pendingCapture.tokenColour;
    dispatch(setPendingCapture(null));
    dispatch(deactivateAllTokens(currentPlayerColour));
  };

  const handleForceDare = () => {
    const currentPlayerColour = pendingCapture.tokenColour;

    dispatch(setPendingCapture(null));
    dispatch(deactivateAllTokens(currentPlayerColour));
    
    const levelKey = `level${currentLevel}` as 'level1' | 'level2' | 'level3';
    const typedChallengeData = CHALLENGE_DATA as Record<TVibe, Record<TChallengeType, { level1: TChallengeItem[]; level2: TChallengeItem[]; level3: TChallengeItem[] }>>;
    const pool = typedChallengeData[vibe as TVibe]['dare'][levelKey];
    
    // Filter out used cards
    let availableCards = pool.filter((item: TChallengeItem) => {
        const text = typeof item === 'string' ? item : item.text;
        return !usedCards.includes(text);
    });

    if (availableCards.length === 0) {
        availableCards = pool;
    }

    const randomItem = availableCards[Math.floor(Math.random() * availableCards.length)];
    const randomText = typeof randomItem === 'string' ? randomItem : randomItem.text;
    const randomIcon = typeof randomItem === 'string' ? undefined : randomItem.icon;
    const randomIconSize = typeof randomItem === 'string' ? undefined : randomItem.iconSize;
    
    dispatch(setActiveChallenge({
        type: 'dare',
        text: randomText,
        icon: randomIcon,
        iconSize: randomIconSize,
        playerColour: currentPlayerColour,
        isManual: false
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* TODO: Replace devil emoji with themed SVG icon */}
        <h2>Busted! 😈</h2>
        <p className={styles.message}>
          You captured <strong>{opponent?.name}</strong>'s token!
        </p>
        
        <div className={styles.choiceBody}>
            <p>What is your choice of victory?</p>
        </div>

        <div className={styles.actions}>
            <button className={`${styles.btnBase} ${styles.btnSecondary}`} onClick={handleRollAgain}>
                {/* TODO: Replace emoji with custom Dice SVG */}
                <span className={styles.icon}>🎲</span>
                Take Bonus Roll
            </button>
            <div className={styles.divider}>OR</div>
            <button className={`${styles.btnBase} ${styles.btnPrimary}`} onClick={handleForceDare}>
                {/* TODO: Replace emoji with custom Fire SVG */}
                <span className={styles.icon}>🔥</span>
                Force a Dare!
            </button>
        </div>
      </div>
    </div>
  );
}

export default CaptureActionModal;
