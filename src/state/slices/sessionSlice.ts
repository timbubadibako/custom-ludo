import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TVibe = 'Romantic' | 'Fun' | 'Naughty';

export type TDraftPlayer = {
  name: string;
  token: string;
  colour: string;
};

type TSessionState = {
  gameStartTime: number;
  gameInactiveTime: number;
  vibe: TVibe;
  reward: string;
  draftPlayers: TDraftPlayer[];
};

export const initialState: TSessionState = {
  gameInactiveTime: 0,
  gameStartTime: 0,
  vibe: 'Fun',
  reward: 'Winner picks the next song',
  draftPlayers: [
    { name: 'Player 1', token: '🔥', colour: 'blue' },
    { name: 'Player 2', token: '💎', colour: 'red' },
  ],
};

const reducers = {
  setGameStartTime: (state: TSessionState, action: PayloadAction<number>) => {
    state.gameStartTime = action.payload;
  },
  addToGameInactiveTime: (state: TSessionState, action: PayloadAction<number>) => {
    state.gameInactiveTime += action.payload;
  },
  setVibe: (state: TSessionState, action: PayloadAction<TVibe>) => {
    state.vibe = action.payload;
  },
  setReward: (state: TSessionState, action: PayloadAction<string>) => {
    state.reward = action.payload;
  },
  updateDraftPlayer: (state: TSessionState, action: PayloadAction<{ index: number; data: Partial<TDraftPlayer> }>) => {
    const player = state.draftPlayers[action.payload.index];
    if (player) {
      state.draftPlayers[action.payload.index] = { ...player, ...action.payload.data };
    }
  },
  clearSessionState: () => initialState,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers,
});

export const { 
  setGameStartTime, 
  addToGameInactiveTime, 
  setVibe, 
  setReward, 
  updateDraftPlayer,
  clearSessionState 
} = sessionSlice.actions;

export default sessionSlice.reducer;
