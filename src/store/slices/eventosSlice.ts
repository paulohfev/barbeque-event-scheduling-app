import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Evento } from '../../interfaces/Evento';
import { RootState } from '../store';
import { Participante } from '../../interfaces/Participante';

const initialState: Evento[] | [] = [];

export const eventosSlice = createSlice({
  name: 'eventos',
  initialState,
  reducers: {
    obterEventos: (state, action: PayloadAction<Evento[]>) => {
      return action.payload;
    },
    adicionarEventos: (state, action: PayloadAction<Evento>) => {
      return [...state, action.payload];
    },
    removerEvento: (state, action: PayloadAction<string>) => {
      return state.filter((evento) => evento.id !== action.payload);
    },
    atualizarParticipantesConfirmados: (state, action: PayloadAction<{eventoId: string, participante: Participante}>) => {
      const { eventoId, participante } = action.payload;
      return state.map((evento) => {
        if (evento.id === eventoId) {
          return {
            ...evento,
            participantes: evento.participantes.map((part) => {
              if (part.id === participante.id) {
                return { ...part, confirmado: !part.confirmado };
              }

              return part;
            }),
          }
        }

        return evento;
      });
    }
  },
});

export const { obterEventos, adicionarEventos, atualizarParticipantesConfirmados, removerEvento } = eventosSlice.actions;

export const selecionarEventos = (state: RootState) => state.eventos;

export default eventosSlice.reducer;
