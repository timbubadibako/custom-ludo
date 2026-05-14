import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Note from '../../components/Note/Note';
import styles from './HowToPlay.module.css';
import { useCleanup } from '../../hooks/useCleanup';

const H = ({ c }: { c: string }) => <span aria-hidden="true">{c}</span>;

function HowToPlay() {
  const cleanup = useCleanup();
  useEffect(() => {
    document.title = 'Rules | Ludo Foreplay Night';
    cleanup();
  }, [cleanup]);
  return (
    <div className={styles.howToPlayContainer}>
      <main className={styles.howToPlay}>
        <section className={styles.introduction}>
          <h1>
            <H c="🎲" /> Ludo Foreplay Night
          </h1>
          <p>
            Welcome to a more intimate spin on the classic board game. The core goal remains the same: 
            get your 4 tokens home. However, the journey is filled with sensual challenges, secrets, and rewards.
          </p>
        </section>

        <section className={styles.section}>
          <h2>
            <H c="🎯" /> The Goal & The Reward
          </h2>
          <p>
            Be the first to move all <strong>4 of your tokens</strong> into your Home Base. 
            The winner gets to claim the <strong>Custom Reward</strong> agreed upon at the start of the night.
          </p>
        </section>

        <section className={styles.section}>
          <h2>
            <H c="✨" /> Special Tiles & Instant Dice
          </h2>
          <p>
            The board features special tiles that trigger intimate popups. 
            Landing on them not only builds tension but grants you strategic advantages:
          </p>
          <ul>
            <li>
              <strong>🔮 Truth Tiles:</strong> Answer a revealing question. Completing it grants you an <strong>instant dice value of 3</strong> (can be used to free a token from base!).
            </li>
            <li>
              <strong>🎭 Dare Tiles:</strong> Perform a spicy action. Completing it grants you an <strong>instant dice value of 6</strong> (free a token or sprint ahead!).
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>
            <H c="⚔️" /> Capturing & The Loser's Choice
          </h2>
          <p>
            If your token lands exactly on an opponent's token, they are captured and sent back to base! 
            In Foreplay Night, capturing gives the attacker a powerful choice:
          </p>
          <Note type="bonus">
            <strong>Post-Capture Options:</strong><br/>
            1. Roll the dice again (Classic Ludo Rule).<br/>
            2. <strong>Force your opponent</strong> to immediately draw a Truth or Dare card of your choice!
          </Note>
        </section>

        <section className={styles.section}>
          <h2>
            <H c="🎲" /> Classic Movement Rules
          </h2>
          <ul>
            <li>You must roll a <strong>6</strong> to move a token out of the base.</li>
            <li>Tokens move clockwise based on the dice roll.</li>
            <li>Rolling a 6 grants a bonus roll. (But don't roll three 6s in a row, or your turn ends!)</li>
            <li>Tokens are safe from capture if they land on a <strong>Star Tile</strong>.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>
            <H c="🛑" /> Consent & Safety
          </h2>
          <p>
            This game is designed to build intimacy, but comfort is the ultimate priority.
            Either player can press the <strong>Finish Now</strong> button at any time to pause or end the game without questions asked.
          </p>
        </section>

        <Link to="/setup" className={styles.backLink}>
          Start Playing
        </Link>
      </main>
    </div>
  );
}

export default HowToPlay;
