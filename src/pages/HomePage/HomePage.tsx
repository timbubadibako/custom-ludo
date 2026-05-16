import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCleanup } from '../../hooks/useCleanup';
import { 
  setVibe, 
  setReward, 
  updateDraftPlayer, 
  type TVibe 
} from '../../state/slices/sessionSlice';
import type { RootState } from '../../state/store';
import styles from './HomePage.module.css';
import clsx from 'clsx';

const vibeModes = [
  {
    name: 'Romantic' as TVibe,
    // TODO: Replace 💗 with icon/asset
    icon: '💗',
    tone: 'Soft touches, slower pacing, and warmer prompts.',
  },
  {
    name: 'Fun' as TVibe,
    // TODO: Replace 🎲 with icon/asset
    icon: '🎲',
    tone: 'Playful energy, light challenges, and quick surprises.',
  },
  {
    name: 'Naughty' as TVibe,
    // TODO: Replace 🔥 with icon/asset
    icon: '🔥',
    tone: 'Neon vibes, intense challenges, and wild consequences.',
  },
] as const;

// TODO: Replace emojis in tokenIcons with icons/assets
const tokenIcons = ['🔥', '💗', '🎭', '✨', '💎', '❤️‍🔥'];
const rewardPresets = ['Winner picks the next song', 'Custom reward', 'Victory drink / snack'];

function HomePage() {
  const cleanup = useCleanup();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { vibe, reward, draftPlayers } = useSelector((state: RootState) => state.session);
  
  const [showConsent, setShowConsent] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [hasSavedGame, setHasSavedGame] = useState(false);

  useEffect(() => {
    document.title = 'Ludo Foreplay Night | 18+ Interactive Game';
    
    // Check for saved game
    const saved = localStorage.getItem('libreludo_save_v1');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.players?.players?.length > 0) {
                // Use a non-cascading way or ensure this only runs once
                setHasSavedGame(true);
            }
        } catch { /* ignore */ }
    }

    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConsent(true);
  };

  const handleContinueClick = () => {
    navigate('/play', { state: { initData: [] } }); 
  };

  const confirmAndPlay = () => {
    if (hasAgreed) {
      localStorage.removeItem('libreludo_save_v1'); // Start fresh
      navigate('/setup');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.homePage}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>LibreLudo: Foreplay Edition</p>
            <h1>
              <span>Intimate board game</span>
              Start the night.
            </h1>
            <p className={styles.heroText}>
              A classic Ludo experience reimagined for couples. Choose your mood, set the stakes, and let the dice decide your evening.
            </p>

            <div className={styles.badgeRow}>
              <span className={styles.ageBadge}>18+ Only</span>
              <span className={styles.modeBadge}>{vibe} Mode Active</span>
            </div>

            <nav className={styles.ctaButtons} aria-label="Primary actions">
              <button className={clsx(styles.ctaButton, styles.playNowBtn)} onClick={handlePlayClick}>
                New Game
              </button>
              {hasSavedGame && (
                <button className={clsx(styles.ctaButton, styles.continueBtn)} onClick={handleContinueClick}>
                  Continue Match
                </button>
              )}
              <Link className={clsx(styles.ctaButton, styles.howToPlayBtn)} to="/how-to-play">
                How to Play
              </Link>
            </nav>
          </div>

          <aside className={styles.heroSummary}>
            <div className={styles.summaryCard}>
              <p className={styles.subLabel}>Current Preference</p>
              <h3>{vibe} Vibe</h3>
              <p className={styles.summaryText}>
                {vibeModes.find(m => m.name === vibe)?.tone}
              </p>
            </div>
          </aside>
        </section>

        <section className={styles.mainGrid}>
          <article className={styles.panelCard}>
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Mood Selector</p>
              <h2>Select your intensity.</h2>
            </div>

            <div className={styles.modeGrid}>
              {vibeModes.map((mode) => (
                <button
                  key={mode.name}
                  type="button"
                  className={clsx(styles.modeCard, vibe === mode.name && styles.modeCardActive)}
                  onClick={() => dispatch(setVibe(mode.name))}
                >
                  <span className={styles.modeEmoji} aria-hidden="true">
                    {mode.icon}
                  </span>
                  <strong>{mode.name}</strong>
                  <p>{mode.tone}</p>
                </button>
              ))}
            </div>
          </article>

          <article className={styles.panelCard}>
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Quick Setup</p>
              <h2>Players & Rewards.</h2>
            </div>

            <div className={styles.playerGrid}>
              {draftPlayers.map((player: { name: string; token: string }, index: number) => (
                <div key={index} className={styles.playerCard}>
                  <label htmlFor={`player${index}`}>Player {index + 1}</label>
                  <input 
                    id={`player${index}`} 
                    type="text" 
                    value={player.name} 
                    onChange={(e) => dispatch(updateDraftPlayer({ index, data: { name: e.target.value } }))}
                  />
                  <div className={styles.tokenRow}>
                    {tokenIcons.map((icon) => (
                      <button 
                        key={icon} 
                        type="button" 
                        className={clsx(styles.tokenChip, player.token === icon && styles.tokenChipActive)}
                        onClick={() => dispatch(updateDraftPlayer({ index, data: { token: icon } }))}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.rewardBox}>
              <p className={styles.subLabel}>Set the Victory Reward</p>
              <div className={styles.rewardRow}>
                {rewardPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={clsx(styles.rewardChip, reward === preset && styles.rewardChipActive)}
                    onClick={() => dispatch(setReward(preset))}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                className={styles.rewardInput}
                type="text"
                value={reward}
                onChange={(e) => dispatch(setReward(e.target.value))}
                placeholder="Or type a custom reward..."
              />
            </div>
          </article>
        </section>

        <section className={styles.featureRow}>
          <article className={styles.featureCard}>
            <p className={styles.kicker}>Truth</p>
            <h3>Reveal</h3>
            <p>Sincere questions to deepen your connection or spark curiosity.</p>
          </article>
          <article className={styles.featureCard}>
            <p className={styles.kicker}>Dare</p>
            <h3>Challenge</h3>
            <p>Playful actions and sensual tasks to keep the energy high.</p>
          </article>
          <article className={styles.featureCard}>
            <p className={styles.kicker}>Foreplay</p>
            <h3>Intensity</h3>
            <p>Special tiles that bring the heat and escalate the match.</p>
          </article>
        </section>

        <footer className={styles.footer}>
          <small className={styles.creditLine}>Built with passion by Priyanshu Rav & Timbubadibako.</small>
        </footer>
      </main>

      {/* Consent Modal Overlay */}
      {showConsent && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Safety & Consent</h2>
            <div className={styles.consentBody}>
              <p>By proceeding, you confirm that:</p>
              <ul>
                <li>Both players are 18 years of age or older.</li>
                <li>Both players consent to the selected game mode and its challenges.</li>
                <li>The game can be stopped at any time if either player feels uncomfortable.</li>
              </ul>
            </div>
            <label className={styles.consentCheckbox}>
              <input 
                type="checkbox" 
                checked={hasAgreed} 
                onChange={(e) => setHasAgreed(e.target.checked)} 
              />
              <span>I/We understand and agree to proceed.</span>
            </label>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowConsent(false)}>Cancel</button>
              <button 
                className={clsx(styles.confirmBtn, !hasAgreed && styles.btnDisabled)} 
                onClick={confirmAndPlay}
                disabled={!hasAgreed}
              >
                Let's Play
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
