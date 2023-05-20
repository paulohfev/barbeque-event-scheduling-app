import React from 'react';
import { ReactComponent as IconeChurrasco } from '../../assets/icones/churrasco-icone.svg';
import ItemAgendado from '../../componentes/ItemAgendado';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import styles from './PaginaChurrascoLista.module.scss';
import { Link } from 'react-router-dom';

const PaginaChurrasLista: React.FC = () => {
  return (
    <PaginaLayoutWrapper>
      <div className={styles['container']}>
        <ItemAgendado />

        <Link to="/criar-evento" className={styles['link']}>
          <button className={styles['botao-adicionar-churrasco']}>
            <div className={styles['botao-icone-wrapper']}>
              <IconeChurrasco />
            </div>

            <span className={styles['botao-texto']}>Adicionar Churras</span>
          </button>
        </Link>
      </div>
    </PaginaLayoutWrapper>
  )
};

export default PaginaChurrasLista;
