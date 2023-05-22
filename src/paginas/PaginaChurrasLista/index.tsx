import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import ItemAgendado from '../../componentes/ItemAgendado';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { obterEventos, removerEvento, selecionarEventos } from '../../store/slices/eventosSlice';
import { ReactComponent as IconeChurrasco } from '../../assets/icones/churrasco-icone.svg';
import styles from './PaginaChurrascoLista.module.scss';

const PaginaChurrasLista: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(obterEventos);
  }, [dispatch]);
  const eventos = useAppSelector(selecionarEventos);

  const renderizarListaItensAgendados = () => {
    return eventos.map((evento, index) => {
      const numeroParticipantes = evento.participantes.length;
      let valorTotalParticipantes = 0;

      for (let i = 0; i < evento.participantes.length; i++) {
        valorTotalParticipantes += Number(evento.participantes[i].valor);
      }

      const deletarEvento = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, eventoId: string) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(removerEvento(eventoId))
      }

      return (
        <Grid item xs={12} md={4} lg={4} key={evento.id} className={styles['grid-item']}>
          <Link
            className={styles['evento-link']}
            to={`/evento/${evento.id}`}
          >
            <button className={styles['deletar-evento']} onClick={(event) => deletarEvento(event, evento.id)}>
              Remover
            </button>
            <ItemAgendado
              data={evento.data}
              titulo={evento.titulo}
              numeroParticipantes={numeroParticipantes}
              valorTotalParticipantes={valorTotalParticipantes}
            />
          </Link>
        </Grid>
      );
    });
  };

  return (
    <PaginaLayoutWrapper>
      <Grid container columns={{ xs: 12, md: 8, lg: 10 }} spacing={2} className={styles['grid-container']}>
        {renderizarListaItensAgendados()}

        <Grid item xs={12} md={4} lg={4}>
          <Link to="/criar-evento" className={styles['link']}>
            <button className={styles['botao-adicionar-churrasco']}>
              <div className={styles['botao-icone-wrapper']}>
                <IconeChurrasco />
              </div>

              <span className={styles['botao-texto']}>Adicionar Churras</span>
            </button>
          </Link>
        </Grid>
      </Grid>
    </PaginaLayoutWrapper>
  )
};

export default PaginaChurrasLista;
