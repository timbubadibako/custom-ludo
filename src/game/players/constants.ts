import type { TPlayerColour, TPlayerCount } from '../../types';

export const playerColours = {
  blue: '#24262b',   /* Dark Slate */
  red: '#3b2226',    /* Dark Burgundy */
  green: '#3a3324',  /* Dark Olive/Gold */
  yellow: '#2b271d', /* Dark Mud/Gold */
};

export const MAX_PLAYER_NAME_LENGTH = 15;
export const playerSequences: Record<TPlayerCount, TPlayerColour[]> = {
  two: ['blue', 'green'],
  three: ['blue', 'red', 'green'],
  four: ['blue', 'red', 'green', 'yellow'],
};
