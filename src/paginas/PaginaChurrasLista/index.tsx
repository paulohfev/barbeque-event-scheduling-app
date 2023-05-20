import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconeChurrasco } from '../../assets/icones/churrasco-icone.svg';
import ItemAgendado from '../../componentes/ItemAgendado';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import styles from './PaginaChurrascoLista.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { obterEventos, selecionarEventos } from '../../store/slices/eventosSlice';

const PaginaChurrasLista: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(obterEventos)
  }, []);
  const eventos = useAppSelector(selecionarEventos);
  console.log(eventos)

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
