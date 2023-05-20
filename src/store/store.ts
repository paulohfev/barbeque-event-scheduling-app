import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import EventosReducer from './slices/eventosSlice';

const configPersist = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(configPersist, combineReducers({
  eventos: EventosReducer,
}));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
