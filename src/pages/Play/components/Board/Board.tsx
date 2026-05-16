import BoardImage from '../../../../assets/board.svg?react';
import BoardImage2p from '../../../../assets/board_2p.svg?react';
import Token from '../Token/Token';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../state/store';
import { useCallback, useState } from 'react';
import { NUMBER_OF_BLOCKS_IN_ONE_ROW, resizeBoard } from '../../../../state/slices/boardSlice';
import { ERRORS } from '../../../../utils/errors';
import type { TCoordinate, TPlayer, TToken } from '../../../../types';
import { getTokenDOMId, tokensWithCoord } from '../../../../game/tokens/logic';
import type { TTokenClickData } from '../../../../types/tokens';
import styles from './Board.module.css';
import { useResizeObserver } from '../../../../hooks/useResizeObserver';
import { SPECIAL_TILES } from '../../../../game/coords/specialTiles';
import clsx from 'clsx';

function Board() {
  const { players, currentPlayerColour } = useSelector((state: RootState) => state.players);
  const { boardTileSize, boardSideLength } = useSelector((state: RootState) => state.board);
  const [tokenClickData, setTokenClickData] = useState<TTokenClickData | null>(null);
  const [boardNode, setBoardNode] = useState<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const onBoardResize = useCallback(() => {
    if (!boardNode) throw new Error(ERRORS.boardDoesNotExist());
    const boardSideLength = boardNode.getBoundingClientRect().width;
    dispatch(resizeBoard(boardSideLength));
  }, [boardNode, dispatch]);

  useResizeObserver(boardNode, onBoardResize);

  const handleBoardClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const currentPlayer = players.find((p: TPlayer) => p.colour === currentPlayerColour);
    if (currentPlayer?.isBot) return;

    if (!boardNode) throw new Error(ERRORS.boardDoesNotExist());
    const { top, left } = boardNode.getBoundingClientRect();
    const boardX = e.clientX - left;
    const boardY = e.clientY - top;
    const tileStartCoords = Array(NUMBER_OF_BLOCKS_IN_ONE_ROW)
      .fill(null)
      .map((_, i) => (i + 1) * boardTileSize);

    if (boardX > boardSideLength || boardY > boardSideLength || boardX < 0 || boardY < 0) return;

    const coordX = tileStartCoords.findIndex((v) => boardX < v);
    const coordY = tileStartCoords.findIndex((v) => boardY < v);

    const coords: TCoordinate = { x: coordX, y: coordY };

    const tokenToMove = tokensWithCoord(coords, players).filter(
      (t) => t.colour === currentPlayerColour
    )[0];

    if (!tokenToMove || tokenToMove.isLocked) return;

    setTokenClickData({
      timestamp: Date.now(),
      colour: tokenToMove.colour,
      id: tokenToMove.id,
    });
  };

  const is2PlayerMode = players.length === 2;

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board} ref={setBoardNode} onClick={handleBoardClick}>

        {players.map((p: TPlayer) =>
          p.tokens.map((t: TToken) => (
            <Token
              colour={t.colour}
              id={t.id}
              tokenClickData={tokenClickData}
              key={getTokenDOMId(t.colour, t.id)}
            />
          ))
        )}
        
        {is2PlayerMode ? (
          <BoardImage2p className={styles.boardImage} aria-hidden="true" />
        ) : (
          <BoardImage className={styles.boardImage} aria-hidden="true" />
        )}

        {/* Render Special Tiles Overlays using direct SVG for maximum reliability */}
        {SPECIAL_TILES.map((tile, i) => {
          const color = tile.type === 'truth' ? '#ff4d80' : '#ffd166';
          return (
            <div 
              key={`special-${i}`}
              className={clsx(styles.specialTileMarker, styles[`marker_${tile.type}`])}
              style={{
                left: tile.coords.x * boardTileSize,
                top: tile.coords.y * boardTileSize,
                width: boardTileSize,
                height: boardTileSize,
                zIndex: 60,
                '--glow-color': color,
              } as React.CSSProperties}
            >
              <svg viewBox="0 0 100 100" style={{ width: '50%', height: '50%', filter: `drop-shadow(0 0 8px ${color})` }}>
                <rect x="5" y="5" width="90" height="90" rx="15" stroke={color} strokeWidth="8" fill="rgba(0,0,0,0.5)" />
                {tile.type === 'truth' ? (
                  <circle cx="50" cy="50" r="18" fill={color} />
                ) : (
                  <path d="M50 25V75M25 50H75" stroke={color} strokeWidth="12" strokeLinecap="round" />
                )}
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Board;
