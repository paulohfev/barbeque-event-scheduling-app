import { Participante } from "./Participante";

export interface Evento {
  data: string,
  descricao: string,
  participantes: Participante[],
}