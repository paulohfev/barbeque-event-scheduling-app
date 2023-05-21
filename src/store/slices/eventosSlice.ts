import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Evento } from '../../interfaces/Evento';
import { RootState } from '../store';

const initialState: Evento[] | [] = [];

export const eventosSlice = createSlice({
  name: 'eventos',
  initialState,
  reducers: {
    obterEventos: (state, action: PayloadAction<Evento[]>) => {
      return action.payload;
    },
    obterEventoPorId: (state, action: PayloadAction<string>) => {
      state.find((evento) => evento.id === action.payload);
    },
    adicionarEventos: (state, action: PayloadAction<Evento>) => {
      return [...state, action.payload];
    }
  },
});

export const { obterEventos, adicionarEventos, obterEventoPorId } = eventosSlice.actions;

export const selecionarEventos = (state: RootState) => state.eventos;

export default eventosSlice.reducer;
