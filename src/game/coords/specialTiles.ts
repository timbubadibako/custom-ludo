import type { TCoordinate } from '../../types';
import { incrementPlayerChallenges } from '../../state/slices/playersSlice';
import { 
    type TChallengeType, 
    setActiveChallenge, 
    setLevel, 
    markCardAsUsed,
    clearUsedCards
} from '../../state/slices/boardSlice';
import { CHALLENGE_DATA, type TChallengeItem } from './challengeData';
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

/**
 * Triggers a special tile challenge logic.
 * Only DARE challenges will increment the level/heat bar.
 */
export function triggerSpecialTile(
  coords: TCoordinate, 
  vibe: TVibe, 
  playerColour: TPlayerColour,
  dispatch: AppDispatch,
  state: RootState
): boolean {
  const specialTile = SPECIAL_TILES.find(t => areCoordsEqual(t.coords, coords));
  if (specialTile) {
    const { currentLevel, usedCards } = state.board;
    const levelKey = `level${currentLevel}` as 'level1' | 'level2' | 'level3';
    
    const typedChallengeData = CHALLENGE_DATA as Record<TVibe, Record<TChallengeType, { level1: TChallengeItem[]; level2: TChallengeItem[]; level3: TChallengeItem[] }>>;
    const pool = typedChallengeData[vibe][specialTile.type][levelKey];
    
    if (pool && pool.length > 0) {
        // Filter out used cards
        let availableCards = pool.filter((item: TChallengeItem) => {
            const text = typeof item === 'string' ? item : item.text;
            return !usedCards.includes(text);
        });
        
        // If all cards in this level/type are used, clear history for this type and reuse
        if (availableCards.length === 0) {
            dispatch(clearUsedCards());
            availableCards = pool;
        }

        const randomItem = availableCards[Math.floor(Math.random() * availableCards.length)];
        const randomText = typeof randomItem === 'string' ? randomItem : randomItem.text;
        const randomIcon = typeof randomItem === 'string' ? undefined : randomItem.icon;
        const randomIconSize = typeof randomItem === 'string' ? undefined : randomItem.iconSize;
        
        dispatch(setActiveChallenge({
          type: specialTile.type,
          text: randomText,
          icon: randomIcon,
          iconSize: randomIconSize,
          playerColour,
          isManual: false
        }));

        dispatch(markCardAsUsed(randomText));

        // ONLY DARE increments the progress bar and triggers level ups
        if (specialTile.type === 'dare') {
            dispatch(incrementPlayerChallenges(playerColour));

            const darePool = typedChallengeData[vibe]['dare'][levelKey];
            const usedDareCount = darePool.filter((item: TChallengeItem) => {
                const text = typeof item === 'string' ? item : item.text;
                return usedCards.includes(text);
            }).length + 1;

            if (usedDareCount >= darePool.length - 3 && currentLevel < 3) {
                dispatch(setLevel(currentLevel + 1));
            }
        }

        return true;
    }
  }
  return false;
}
