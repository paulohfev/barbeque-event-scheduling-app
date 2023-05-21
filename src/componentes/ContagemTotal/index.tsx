import React from 'react';
import styles from './ContagemValorTotal.module.scss';

type Props = {
  icone: React.ReactNode;
  valor: string | number;
};

const ContagemValorTotal: React.FC<Props> = ({ icone, valor }) => {
  return (
    <div className={styles['container']}>
      {icone}
      <p className={styles['texto']}>{valor}</p>
    </div>
  )
}

export default ContagemValorTotal;
