import { configureStore, combineReducers } from '@reduxjs/toolkit';
import playersReducer from './slices/playersSlice';
import boardReducer from './slices/boardSlice';
import diceReducer from './slices/diceSlice';
import sessionReducer from './slices/sessionSlice';

// Light-weight persistence to LocalStorage
const PERSIST_KEY = 'libreludo_save_v1';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem(PERSIST_KEY);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch {
        return undefined;
    }
};

const saveState = (state: RootState) => {
    try {
        const stateToSave = {
            players: state.players,
            board: state.board,
            session: state.session
        };
        localStorage.setItem(PERSIST_KEY, JSON.stringify(stateToSave));
    } catch {
        // Ignore write errors
    }
};

const rootReducer = combineReducers({
  players: playersReducer,
  board: boardReducer,
  dice: diceReducer,
  session: sessionReducer,
});

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preloadedState: preloadedState as any,
  devTools: import.meta.env.DEV,
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
