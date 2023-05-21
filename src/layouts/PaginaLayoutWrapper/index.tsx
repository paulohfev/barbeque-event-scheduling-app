import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rotas } from '../../enums/rotas';
import { ReactComponent as LogoTrinca } from '../../assets/icones/trinca-icone.svg';
import styles from './PaginaLayoutWrapper.module.scss';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

const PageLayoutWrapper: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className={styles['wrapper']}>
      <button className={styles['back-button']} onClick={() => navigate(Rotas.root)}>{'\u21A9'} Back</button>
      <div className={styles['hero']}>
        <h1 className={styles['hero-titulo']}>Agenda de Churras</h1>
      </div>

      <main className={styles['main']}>{children}</main>

      <footer className={styles.footer}>
        <LogoTrinca />
      </footer>
    </div>
  )
};

export default PageLayoutWrapper;