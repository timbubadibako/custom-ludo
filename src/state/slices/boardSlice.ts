import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TPlayerColour } from '../../types';

export type TChallengeType = 'truth' | 'dare' | 'foreplay';

export type TActiveChallenge = {
  type: TChallengeType;
  text: string;
  playerColour: TPlayerColour;
} | null;

type TBoardState = {
  boardSideLength: number;
  boardTileSize: number;
  tokenHeight: number;
  tokenWidth: number;
  activeChallenge: TActiveChallenge;
};

export const initialState: TBoardState = {
  boardSideLength: 0,
  boardTileSize: 0,
  tokenHeight: 0,
  tokenWidth: 0,
  activeChallenge: null,
};

export const NUMBER_OF_BLOCKS_IN_ONE_ROW = 15;
export const TOKEN_WIDTH_HEIGHT_RATIO = 0.625;

const reducers = {
  resizeBoard: (state: TBoardState, action: PayloadAction<number>) => {
    state.boardSideLength = action.payload;
    state.boardTileSize = action.payload / NUMBER_OF_BLOCKS_IN_ONE_ROW;
    state.tokenHeight = (action.payload / NUMBER_OF_BLOCKS_IN_ONE_ROW) * 0.8;
    state.tokenWidth =
      (action.payload / NUMBER_OF_BLOCKS_IN_ONE_ROW) * 0.8 * TOKEN_WIDTH_HEIGHT_RATIO;
  },
  setActiveChallenge: (state: TBoardState, action: PayloadAction<TActiveChallenge>) => {
    state.activeChallenge = action.payload;
  },
  clearActiveChallenge: (state: TBoardState) => {
    state.activeChallenge = null;
  },
  clearBoardState: () => initialState,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers,
});

export const { resizeBoard, setActiveChallenge, clearActiveChallenge, clearBoardState } = boardSlice.actions;

export default boardSlice.reducer;
