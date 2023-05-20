import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconeChurrasco } from '../../assets/icones/churrasco-icone.svg';
import ItemAgendado from '../../componentes/ItemAgendado';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { obterEventos, selecionarEventos } from '../../store/slices/eventosSlice';
import { formatarRotaSlug } from '../../utilidades/rotas';
import styles from './PaginaChurrascoLista.module.scss';

const PaginaChurrasLista: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(obterEventos)
  }, [dispatch]);
  const eventos = useAppSelector(selecionarEventos);

  const renderizarListaItensAgendados = () => {
    return eventos.map((evento, index) => {
      const numeroParticipantes = evento.participantes.length;
      let valorTotalParticipantes = 0;

      for (let i = 0; i < evento.participantes.length; i++) {
        valorTotalParticipantes += Number(evento.participantes[i].valor);
      }

      return (
        <Link
          className={styles['evento-link']}
          key={`${evento.titulo}-${index}`}
          to={`/evento/${evento.id}`}
        >
          <ItemAgendado
            data={evento.data}
            titulo={evento.titulo}
            numeroParticipantes={numeroParticipantes}
            valorTotalParticipantes={valorTotalParticipantes}
          />
        </Link>
      )
    })
  }

  return (
    <PaginaLayoutWrapper>
      <div className={styles['container']}>
        {renderizarListaItensAgendados()}

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
