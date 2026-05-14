import { useDispatch, useSelector } from 'react-redux';
import { deactivateAllTokens } from '../state/slices/playersSlice';
import { type TToken } from '../types';
import { useCaptureTokenInSameCoord } from './useCaptureTokenInSameCoord';
import { useMoveTokenForward } from './useMoveTokenForward';
import type { TMoveData } from '../types/tokens';
import { getAvailableSteps } from '../game/tokens/logic';
import { useCallback } from 'react';
import { triggerSpecialTile } from '../game/coords/specialTiles';
import type { RootState } from '../state/store';

export function useMoveAndCaptureToken() {
  const moveToken = useMoveTokenForward();
  const captureToken = useCaptureTokenInSameCoord();
  const dispatch = useDispatch();
  const { vibe } = useSelector((state: RootState) => state.session);

  return useCallback(
    async (token: TToken, diceNumber: number): Promise<TMoveData | null> => {
      if (getAvailableSteps(token) < diceNumber) {
        dispatch(deactivateAllTokens(token.colour));
        return null;
      }

      const { hasTokenReachedHome, lastTokenCoord, hasPlayerWon, moved } = await moveToken(
        diceNumber,
        token
      );
      if (!moved) return null;

      // Logic: Trigger Special Tile if landed on one
      if (!hasTokenReachedHome) {
        triggerSpecialTile(lastTokenCoord, vibe, token.colour, dispatch);
      }

      const { isCaptured, capturedColours } = await captureToken(token, lastTokenCoord);
      
      if (isCaptured && capturedColours.length > 0) {
        const wantsToRollAgain = window.confirm(`You captured ${capturedColours.join(', ')}!\n\nClick [OK] to Roll Again.\nClick [Cancel] to Force them to take a Dare!`);
        
        if (!wantsToRollAgain) {
           // Force a dare on the first captured opponent instead of rolling again
           const opponentColour = capturedColours[0];
           // Delay slightly so the capture animation finishes
           setTimeout(() => {
             triggerSpecialTile(lastTokenCoord, vibe, opponentColour, dispatch);
           }, 500);
           // We return isCaptured: false so handlePostDiceRollThunk doesn't grant an extra roll
           return { isCaptured: false, hasTokenReachedHome, hasPlayerWon };
        }
      }

      return { isCaptured, hasTokenReachedHome, hasPlayerWon };
    },
    [captureToken, dispatch, moveToken, vibe]
  );
}
