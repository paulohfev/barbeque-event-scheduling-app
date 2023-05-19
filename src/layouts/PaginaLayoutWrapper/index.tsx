import React from 'react';
import { ReactComponent as LogoTrinca } from '../../assets/icones/trinca-icone.svg';
import styles from './PaginaLayoutWrapper.module.scss';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

const PageLayoutWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles['wrapper']}>
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