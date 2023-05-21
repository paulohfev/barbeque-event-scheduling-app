import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Grid } from '@mui/material';
import ContagemValorTotal from '../../componentes/ContagemTotal';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selecionarEventos, atualizarParticipantesConfirmados } from '../../store/slices/eventosSlice';
import { Evento } from '../../interfaces/Evento';
import { formatarData, formatarParaMoeda } from '../../utilidades/conteudo';
import { ReactComponent as IconeDinheiro } from '../../assets/icones/dinheiro-icone.svg';
import { ReactComponent as IconeGrupo } from '../../assets/icones/grupo-icone.svg';
import styles from './PaginaEvento.module.scss';

const PaginaEvento: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id: eventoId } = useParams();
  const evento = useAppSelector(selecionarEventos).find((evento) => evento.id === eventoId) as Evento;

  const numeroParticipantes = evento?.participantes.length;
  const obterValorTotalParticipantes = () => {
    let valorTotalParticipantes = 0;

    for (let i = 0; i < evento?.participantes.length; i++) {
      valorTotalParticipantes += Number(evento?.participantes[i].valor);
    }

    return formatarParaMoeda(valorTotalParticipantes.toString());
  };

  const renderizarListaParticipantes = () => {
    return (
      <ul className={styles['lista-participantes']}>
        {evento.participantes.map((participante) => {
          return (
            <li className={styles['participante-item']} key={participante.id}>
              <div className={styles['container-participante-item-texto']}>
                <div className={styles['campo-container']}>
                  <input
                    className={styles['campo-participante']}
                    checked={participante.confirmado}
                    onChange={() => {
                      if (eventoId) {
                        dispatch(atualizarParticipantesConfirmados({
                          eventoId: eventoId,
                          participante: participante
                        }));
                      }
                    }}
                    id={`campo-participante-${participante.id}`}
                    type="checkbox"
                  />
                  <label
                    className={styles['campo-participante-final']}
                    htmlFor={`campo-participante-${participante.id}`}
                  />
                </div>

                <span>{participante.nome}</span>
              </div>

              <span className={classNames({ [styles['confirmado']]: participante.confirmado })}>
                {formatarParaMoeda(participante.valor)}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

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
