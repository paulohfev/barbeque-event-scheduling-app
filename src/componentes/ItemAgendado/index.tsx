import React from 'react';
import { ReactComponent as IconeDinheiro } from '../../assets/icones/dinheiro-icone.svg';
import { ReactComponent as IconeGrupo } from '../../assets/icones/grupo-icone.svg';
import styles from './ItemAgendado.module.scss';

const ItemAgendado: React.FC = () => {
  return (
    <div className={styles['wrapper']}>
      <div>
        <p className={styles['data']}>01/12</p>
        <p className={styles['descricao']}>Lorem Ipsum</p>
      </div>

      <div className={styles['footer-item-agendado']}>
        <div className={styles['footer-grupo']}>
          <IconeGrupo />
          <p className={styles['footer-texto']}>12</p>
        </div>

        <div className={styles['footer-grupo']}>
          <IconeDinheiro />
          <p className={styles['footer-texto']}>R$140</p>
        </div>
      </div>
    </div>
  )
};

export default ItemAgendado;
