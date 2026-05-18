import type { TPlayerColour } from '../../../../types';
import styles from './PlayerInput.module.css';
import clsx from 'clsx';
import { playerColours, MAX_PLAYER_NAME_LENGTH } from '../../../../game/players/constants';

type Props = {
  colour: TPlayerColour;
  name: string;
  token: string;
  onNameChange: (name: string) => void;
  onTokenChange: (token: string) => void;
};

{/* TODO: Replace these text labels with gender icon components (e.g. <MaleIcon />, <FemaleIcon />) */}
const tokenOptions = ['Male', 'Female'];

function PlayerInput({ colour, name, token, onNameChange, onTokenChange }: Props) {
  return (
    <div className={styles.playerInputCard}>
      <div className={styles.playerInputMain}>
        <span
          className={styles.playerInputColourDot}
          style={{ backgroundColor: playerColours[colour], color: playerColours[colour] }}
        />
        <input
          type="text"
          placeholder="Enter name"
          className={styles.playerNameInput}
          value={name}
          onChange={(e) => onNameChange(e.target.value.slice(0, MAX_PLAYER_NAME_LENGTH))}
        />
        
        <div className={styles.currentTokenDisplay}>
          {/* TODO: Ensure this supports SVG icons once emojis are replaced */}
          {token}
        </div>
      </div>

      <div className={styles.tokenPickerPanel}>
        <div className={styles.tokenOptionsRow}>
          {tokenOptions.map((opt) => {
            return (
              <button
                key={opt}
                type="button"
                className={clsx(
                  styles.tokenOptionBtn, 
                  token === opt && styles.tokenOptionActive
                )}
                onClick={() => onTokenChange(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PlayerInput;
