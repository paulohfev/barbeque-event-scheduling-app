import React from 'react';
import { ReactComponent as IconeChurrasco } from '../../assets/icones/churrasco-icone.svg';
import ItemAgendado from '../../componentes/ItemAgendado';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import styles from './PaginaChurrascoLista.module.scss';

const PaginaChurrasLista: React.FC = () => {
  return (
    <PaginaLayoutWrapper>
      <div className={styles['container']}>
        <ItemAgendado />

        <button className={styles['botao-adicionar-churrasco']}>
          <div className={styles['botao-icone-wrapper']}>
            <IconeChurrasco />
          </div>

          <span className={styles['botao-texto']}>Adicionar Churras</span>
        </button>
      </div>
    </PaginaLayoutWrapper>
  )
};

export default PaginaChurrasLista;
