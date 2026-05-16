import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TPlayerColour } from '../../types';

export type TChallengeType = 'truth' | 'dare';

export type TPendingCapture = {
  opponentColour: TPlayerColour;
  tokenColour: TPlayerColour;
} | null;

export type TChallengeContent = {
    text: string;
    icon?: string;
    iconSize?: number;
};

export type TActiveChallenge = {
  type: TChallengeType;
  text: string;
  playerColour: TPlayerColour;
  isManual?: boolean;
  title?: string;
  icon?: string;
  iconSize?: number;
} | null;

type TBoardState = {
  boardSideLength: number;
  boardTileSize: number;
  tokenHeight: number;
  tokenWidth: number;
  activeChallenge: TActiveChallenge;
  pendingCapture: TPendingCapture;
  currentLevel: number;
  completedChallengesCount: number;
  usedCards: string[];
};

export const initialState: TBoardState = {
  boardSideLength: 0,
  boardTileSize: 0,
  tokenHeight: 0,
  tokenWidth: 0,
  activeChallenge: null,
  pendingCapture: null,
  currentLevel: 1,
  completedChallengesCount: 0,
  usedCards: [],
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
  setPendingCapture: (state: TBoardState, action: PayloadAction<TPendingCapture>) => {
    state.pendingCapture = action.payload;
  },
  clearActiveChallenge: (state: TBoardState) => {
    state.activeChallenge = null;
  },
  incrementCompletedChallenges: (state: TBoardState) => {
    state.completedChallengesCount += 1;
  },
  setLevel: (state: TBoardState, action: PayloadAction<number>) => {
    state.currentLevel = action.payload;
  },
  resetChallengesCount: (state: TBoardState) => {
    state.completedChallengesCount = 0;
  },
  markCardAsUsed: (state: TBoardState, action: PayloadAction<string>) => {
    if (!state.usedCards.includes(action.payload)) {
      state.usedCards.push(action.payload);
    }
  },
  clearUsedCards: (state: TBoardState) => {
    state.usedCards = [];
  },
  clearBoardState: () => initialState,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers,
});

export const {
  resizeBoard,
  setActiveChallenge,
  setPendingCapture,
  clearActiveChallenge,
  incrementCompletedChallenges,
  setLevel,
  resetChallengesCount,
  markCardAsUsed,
  clearUsedCards,
  clearBoardState,
} = boardSlice.actions;

export default boardSlice.reducer;
