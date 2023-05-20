import React from 'react';
import { ReactComponent as IconeDinheiro } from '../../assets/icones/dinheiro-icone.svg';
import { ReactComponent as IconeGrupo } from '../../assets/icones/grupo-icone.svg';
import { formatarData, formatarParaMoeda } from '../../utilidades/conteudo';
import styles from './ItemAgendado.module.scss';

type Props = {
  data: string;
  titulo: string;
  numeroParticipantes: number;
  valorTotalParticipantes: number;
}

const ItemAgendado: React.FC<Props> = ({ data, titulo, numeroParticipantes, valorTotalParticipantes }) => {
  return (
    <div className={styles['wrapper']}>
      <div>
        <p className={styles['data']}>{formatarData(data)}</p>
        <p className={styles['titulo']}>{titulo}</p>
      </div>

      <div className={styles['footer-item-agendado']}>
        <div className={styles['footer-grupo']}>
          <IconeGrupo />
          <p className={styles['footer-texto']}>{numeroParticipantes}</p>
        </div>

        <div className={styles['footer-grupo']}>
          <IconeDinheiro />
          <p className={styles['footer-texto']}>{formatarParaMoeda(valorTotalParticipantes.toString())}</p>
        </div>
      </div>
    </div>
  )
};

export default ItemAgendado;
