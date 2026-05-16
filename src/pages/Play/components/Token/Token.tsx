import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { deactivateAllTokens, setIsAnyTokenMoving } from '../../../../state/slices/playersSlice';
import { type TPlayer, type TPlayerColour, type TTokenClickData, type TDice } from '../../../../types';
import { type TToken } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../state/store';
import TokenImage from '../../../../assets/token.svg?react';
import { useCoordsToPosition } from '../../../../hooks/useCoordsToPosition';
import { setTokenTransitionTime } from '../../../../utils/setTokenTransitionTime';
import { changeTurnThunk } from '../../../../state/thunks/changeTurnThunk';
import { useMoveAndCaptureToken } from '../../../../hooks/useMoveAndCaptureToken';
import { unlockAndAlignTokens } from '../../../../state/thunks/unlockAndAlignTokens';
import { playerColours } from '../../../../game/players/constants';
import { FORWARD_TOKEN_TRANSITION_TIME } from '../../../../game/tokens/constants';
import { playSFX, SFX } from '../../../../utils/audio';
import styles from './Token.module.css';
import clsx from 'clsx';
import { getTokenDOMId } from '../../../../game/tokens/logic';

type Props = {
  colour: TPlayerColour;
  id: number;
  tokenClickData: TTokenClickData | null;
};

function Token({ colour, id, tokenClickData }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { tokenHeight, tokenWidth } = useSelector((state: RootState) => state.board);
  const { players } = useSelector((state: RootState) => state.players);
  const tokenClickDataRef = useRef(tokenClickData);
  const [isCurrentlyFocused, setIsCurrentlyFocused] = useState(false);
  const tokenElRef = useRef<HTMLButtonElement | null>(null);
  const { tokens: playerTokens } = useMemo(
    () => players.find((v: TPlayer) => v.colour === colour),
    [players, colour]
  ) as TPlayer;
  const token = useMemo(() => playerTokens.find((t: TToken) => t.id === id), [playerTokens, id]) as TToken;

  const { coordinates, isActive, isLocked, tokenAlignmentData } = token;

  const { scaleFactor } = tokenAlignmentData;
  const getPosition = useCoordsToPosition();
  const { x, y } = getPosition(coordinates, tokenAlignmentData);
  const dice = useSelector((state: RootState) =>
    state.dice.dice.find((d: TDice) => d.colour === colour)
  );
  const diceNumber = dice?.diceNumber;
  const isRewardRoll = dice?.lastRollIsReward;
  const moveAndCapture = useMoveAndCaptureToken();

  const unlock = () => {
    dispatch(setIsAnyTokenMoving(true));
    playSFX(SFX.TOKEN_UNLOCK);
    setTokenTransitionTime(FORWARD_TOKEN_TRANSITION_TIME, token);
    dispatch(unlockAndAlignTokens({ colour, id }));
    dispatch(deactivateAllTokens(colour));

    setTimeout(() => {
      dispatch(setIsAnyTokenMoving(false));
      
      // If it's a reward roll, we MUST end the turn after unlocking
      if (isRewardRoll) {
        dispatch(changeTurnThunk(moveAndCapture));
      }
    }, FORWARD_TOKEN_TRANSITION_TIME);
  };

  const executeTokenMove = useCallback(async () => {
    if (!isActive || diceNumber === -1 || !diceNumber) return;

    const moveData = await moveAndCapture(token, diceNumber);
    if (!moveData) return;

    const { hasTokenReachedHome, isCaptured, hasPlayerWon } = moveData;
    if (hasPlayerWon) return dispatch(changeTurnThunk(moveAndCapture));
    
    const canRollAgain = diceNumber === 6 && !isRewardRoll;

    if (!canRollAgain && !isCaptured && !hasTokenReachedHome) {
      return dispatch(changeTurnThunk(moveAndCapture));
    }
  }, [diceNumber, dispatch, isRewardRoll, isActive, moveAndCapture, token]);

  useEffect(() => {
    const prevClickData = tokenClickDataRef.current;
    const newTokenClickData = tokenClickData;

    if (!newTokenClickData || prevClickData?.timestamp === newTokenClickData.timestamp) return;
    tokenClickDataRef.current = newTokenClickData;

    if (newTokenClickData.colour === colour && newTokenClickData.id === id) executeTokenMove();
  }, [colour, executeTokenMove, id, tokenClickData]);

  const handleTokenClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.detail === 0) e.stopPropagation();
    if (isLocked && isActive && diceNumber !== -1 && diceNumber) unlock();
    tokenElRef.current?.blur?.();
    executeTokenMove();
  };

  return (
    <button
      id={getTokenDOMId(colour, id)}
      className={clsx(styles.token, styles[colour])}
      tabIndex={isActive ? undefined : -1}
      onFocus={() => setIsCurrentlyFocused(true)}
      onBlur={() => setIsCurrentlyFocused(false)}
      disabled={!isActive}
      ref={tokenElRef}
      onClick={handleTokenClick}
      style={
        {
          '--token-height': `${tokenHeight}px`,
          '--token-width': `${tokenWidth}px`,
          transform: `translate(${x}, ${y}) scale(${scaleFactor})`,
        } as React.CSSProperties
      }
    >
      <span className={clsx(styles.bouncer, { [styles.active]: isActive && !isCurrentlyFocused })}>
        <TokenImage
          className={styles.svg}
          aria-hidden="true"
          style={
            {
              '--fill-colour': playerColours[colour],
            } as React.CSSProperties
          }
        />
      </span>
    </button>
  );
}

export default Token;
