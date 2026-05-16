import type { TPlayerColour, TPlayerCount } from '../../types';

export const playerColours = {
  blue: '#ffd166',   /* Gold Glow (Matching Dare) */
  red: '#ff4d80',    /* Magenta Glow (Matching Truth) */
  green: '#fec8d8',  /* Soft Pink Glow */
  yellow: '#4d80ff', /* Neon Blue Glow */
};

export const MAX_PLAYER_NAME_LENGTH = 15;
export const playerSequences: Record<TPlayerCount, TPlayerColour[]> = {
  two: ['blue', 'green'],
  three: ['blue', 'red', 'green'],
  four: ['blue', 'red', 'green', 'yellow'],
};
