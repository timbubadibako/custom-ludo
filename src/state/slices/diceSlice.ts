import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TDice, TPlayerColour } from '../../types';
import { ERRORS } from '../../utils/errors';

export type TDiceState = {
  dice: TDice[];
  rollBag: Record<TPlayerColour, number[]>;
};

export const initialState: TDiceState = {
  dice: [],
  rollBag: { blue: [], red: [], green: [], yellow: [] },
};

export function getDice(state: TDiceState, colour: TPlayerColour): TDice {
  const dice = state.dice.find((d) => d.colour === colour);
  if (!dice) throw new Error(ERRORS.diceDoesNotExist(colour));
  return dice;
}

export function generateRollBag(): number[] {
  const diceNumbers = Array(36)
    .fill(null)
    .map((_, i) => (i % 6) + 1);
  return diceNumbers;
}

const reducers = {
  registerDice: (state: TDiceState, action: PayloadAction<TPlayerColour>) => {
    state.dice.push({
      colour: action.payload,
      diceNumber: 1,
      isPlaceholderShowing: false,
      lastRollIsReward: false,
    });
    state.rollBag[action.payload] = generateRollBag();
  },
  setIsPlaceholderShowing: (
    state: TDiceState,
    action: PayloadAction<{ colour: TPlayerColour; isPlaceholderShowing: boolean }>
  ) => {
    const dice = getDice(state, action.payload.colour);
    dice.isPlaceholderShowing = action.payload.isPlaceholderShowing;
  },
  setDiceNumber: (
    state: TDiceState,
    action: PayloadAction<{ colour: TPlayerColour; randomIndex: number }>
  ) => {
    const dice = getDice(state, action.payload.colour);
    dice.diceNumber = state.rollBag[action.payload.colour][action.payload.randomIndex];
    dice.lastRollIsReward = false;
    state.rollBag[action.payload.colour] = state.rollBag[action.payload.colour].filter(
      (_, i) => i !== action.payload.randomIndex
    );
  },
  forceDiceNumber: (
    state: TDiceState,
    action: PayloadAction<{ colour: TPlayerColour; number: number; isReward?: boolean }>
  ) => {
    const dice = getDice(state, action.payload.colour);
    dice.diceNumber = action.payload.number;
    dice.lastRollIsReward = !!action.payload.isReward;
  },
  renewRollBag: (state: TDiceState, action: PayloadAction<TPlayerColour>) => {
    state.rollBag[action.payload] = generateRollBag();
  },
  resetDice: (state: TDiceState, action: PayloadAction<TPlayerColour>) => {
    const dice = getDice(state, action.payload);
    dice.diceNumber = 1;
    dice.lastRollIsReward = false;
  },
  clearDiceState: () => initialState,
};

const diceSlice = createSlice({
  name: 'dice',
  initialState,
  reducers,
});

export const {
  registerDice,
  setDiceNumber,
  forceDiceNumber,
  setIsPlaceholderShowing,
  renewRollBag,
  resetDice,
  clearDiceState,
} = diceSlice.actions;

export default diceSlice.reducer;
