import { configureStore } from '@reduxjs/toolkit';
import EventosReducer from './slices/eventosSlice';

export const store = configureStore({
  reducer: {
    eventos: EventosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
