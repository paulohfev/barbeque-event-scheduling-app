import { Participante } from "./Participante";

export interface Evento {
  id: string,
  data: string,
  titulo: string,
  participantes: Participante[],
}