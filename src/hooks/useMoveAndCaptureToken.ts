import { useStore, useDispatch, useSelector } from 'react-redux';
import { deactivateAllTokens } from '../state/slices/playersSlice';
import { setPendingCapture } from '../state/slices/boardSlice';
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
  const store = useStore<RootState>();
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
        triggerSpecialTile(lastTokenCoord, vibe, token.colour, dispatch, store.getState());
      }

      const { isCaptured, capturedColours } = await captureToken(token, lastTokenCoord);
      
      if (isCaptured && capturedColours.length > 0) {
        const opponentColour = capturedColours[0];
        // Open the custom CaptureActionModal instead of using window.confirm
        dispatch(setPendingCapture({
            opponentColour,
            tokenColour: token.colour
        }));
        
        // Return isCaptured: false so handlePostDiceRollThunk doesn't automatically grant extra roll
        // The modal will handle whether they roll again or force a dare
        return { isCaptured: false, hasTokenReachedHome, hasPlayerWon };
      }

      return { isCaptured, hasTokenReachedHome, hasPlayerWon };
    },
    [captureToken, dispatch, moveToken, store, vibe]
  );
}
