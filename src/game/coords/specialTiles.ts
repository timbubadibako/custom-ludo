import type { TCoordinate } from '../../types';
import { type TChallengeType, setActiveChallenge, incrementCompletedChallenges, setLevel, resetChallengesCount } from '../../state/slices/boardSlice';
import { CHALLENGE_DATA } from './challengeData';
import type { TVibe } from '../../state/slices/sessionSlice';
import type { TPlayerColour } from '../../types';
import type { AppDispatch, RootState } from '../../state/store';
import { areCoordsEqual } from './logic';

export type TSpecialTile = {
  coords: TCoordinate;
  type: TChallengeType;
};

// Simplified to only Truth and Dare, placed strategically around the board
export const SPECIAL_TILES: TSpecialTile[] = [
  // Truth Tiles (Purple)
  { coords: { x: 8, y: 2 }, type: 'truth' },
  { coords: { x: 14, y: 6 }, type: 'truth' },
  { coords: { x: 12, y: 8 }, type: 'truth' },
  { coords: { x: 8, y: 14  }, type: 'truth' },
  { coords: { x: 6, y: 12 }, type: 'truth' },
  { coords: { x: 0, y: 8  }, type: 'truth' },
  { coords: { x: 2, y: 6 }, type: 'truth' },
  { coords: { x: 6, y: 0 }, type: 'truth' },

  
  // Dare Tiles (Gold)
  // { coords: { x: 14, y: 14 }, type: 'dare' },
  { coords: { x: 8, y: 5 }, type: 'dare' },
  { coords: { x: 11, y: 6 }, type: 'dare' },
  { coords: { x: 14, y: 8 }, type: 'dare' },
  { coords: { x: 9, y: 8 }, type: 'dare' },
  { coords: { x: 8, y: 11 }, type: 'dare' },
  { coords: { x: 6, y: 14 }, type: 'dare' },
  { coords: { x: 6, y: 9 }, type: 'dare' },
  { coords: { x: 3, y: 8 }, type: 'dare' },
  { coords: { x: 0, y: 6 }, type: 'dare' },
  { coords: { x: 5, y: 6 }, type: 'dare' },
  { coords: { x: 6, y: 3 }, type: 'dare' },
  { coords: { x: 8, y: 0 }, type: 'dare' },
];

export function triggerSpecialTile(
  coords: TCoordinate, 
  vibe: TVibe, 
  playerColour: TPlayerColour,
  dispatch: AppDispatch,
  state: RootState
) {
  const specialTile = SPECIAL_TILES.find(t => areCoordsEqual(t.coords, coords));
  if (specialTile) {
    const { currentLevel, completedChallengesCount } = state.board;
    const levelKey = `level${currentLevel}` as keyof typeof CHALLENGE_DATA[TVibe][TChallengeType];
    const pool = CHALLENGE_DATA[vibe][specialTile.type][levelKey];
    
    if (pool && pool.length > 0) {
        const randomText = pool[Math.floor(Math.random() * pool.length)];
        
        dispatch(setActiveChallenge({
          type: specialTile.type,
          text: randomText,
          playerColour,
          isManual: false
        }));

        // Logic for leveling up
        const totalInLevel = pool.length;
        if (completedChallengesCount >= totalInLevel - 3 && currentLevel < 3) {
            dispatch(setLevel(currentLevel + 1));
            dispatch(resetChallengesCount());
            console.log(`Leveled up to Level ${currentLevel + 1}`);
        } else {
            dispatch(incrementCompletedChallenges());
        }

        return true;
    }
  }
  return false;
}
