import React from 'react';
import { ReactComponent as IconeDinheiro } from '../../assets/icones/dinheiro-icone.svg';
import { ReactComponent as IconeGrupo } from '../../assets/icones/grupo-icone.svg';
import { formatarData, formatarParaMoeda } from '../../utilidades/conteudo';
import styles from './ItemAgendado.module.scss';
import ContagemTotal from '../ContagemTotal';

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
        <ContagemTotal icone={<IconeGrupo />} valor={numeroParticipantes}/>

        <ContagemTotal
          icone={<IconeDinheiro />}
          valor={formatarParaMoeda(valorTotalParticipantes.toString())}
        /> 
      </div>
    </div>
  )
};

export default ItemAgendado;
