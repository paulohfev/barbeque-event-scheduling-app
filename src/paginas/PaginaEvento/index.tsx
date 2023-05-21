import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import ContagemValorTotal from '../../componentes/ContagemTotal';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { obterEventoPorId, selecionarEventos } from '../../store/slices/eventosSlice';
import { formatarData, formatarParaMoeda } from '../../utilidades/conteudo';
import { ReactComponent as IconeDinheiro } from '../../assets/icones/dinheiro-icone.svg';
import { ReactComponent as IconeGrupo } from '../../assets/icones/grupo-icone.svg';
import styles from './PaginaEvento.module.scss';

const PaginaEvento: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(obterEventoPorId(id));
    }
  }, [id]);
  const evento = useAppSelector(selecionarEventos)[0];

  const numeroParticipantes = evento.participantes.length;
  const obterValorTotalParticipantes = () => {
    let valorTotalParticipantes = 0;

    for (let i = 0; i < evento.participantes.length; i++) {
      valorTotalParticipantes += Number(evento.participantes[i].valor);
    }

    return formatarParaMoeda(valorTotalParticipantes.toString());
  };

  const renderizarListaParticipantes = () => {
    return (
      <ul className={styles['lista-participantes']}>
        {evento.participantes.map((participante, index) => {
          return (
            <li className={styles['participante-item']} key={`${participante.nome}-${index}`}>
              <span>{participante.nome}</span>
              <span>{formatarParaMoeda(participante.valor)}</span>
            </li>
          );
        })}
      </ul>
    )
  }

  return (
    <PaginaLayoutWrapper>
      <Grid container>
        <Grid item lg={12}>
          <div className={styles['container']}>
            <header className={styles['header']}>
              <div className={styles['container-header']}>
                <h2 className={styles['data']}>{formatarData(evento.data)}</h2>
                <ContagemValorTotal icone={<IconeGrupo />} valor={numeroParticipantes} />
              </div>

              <div className={styles['container-header']}>
                <h1 className={styles['titulo']}>{evento.titulo}</h1>
                <ContagemValorTotal icone={<IconeDinheiro />} valor={obterValorTotalParticipantes()} />
              </div>
            </header>

            {renderizarListaParticipantes()}
          </div>
        </Grid>
      </Grid>
    </PaginaLayoutWrapper>
  );
};

export default PaginaEvento;
