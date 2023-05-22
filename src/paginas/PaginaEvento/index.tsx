import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Grid, Modal } from '@mui/material';
import ContagemValorTotal from '../../componentes/ContagemTotal';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selecionarEventos, atualizarParticipantesConfirmados, atualizarEvento } from '../../store/slices/eventosSlice';
import { Evento } from '../../interfaces/Evento';
import { Participante } from '../../interfaces/Participante';
import { formatarData, formatarParaMoeda } from '../../utilidades/conteudo';
import { ReactComponent as IconeDinheiro } from '../../assets/icones/dinheiro-icone.svg';
import { ReactComponent as IconeGrupo } from '../../assets/icones/grupo-icone.svg';
import styles from './PaginaEvento.module.scss';
import FormularioEvento from '../../componentes/FormularioEvento';

const PaginaEvento: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id: eventoId } = useParams();
  const evento = useAppSelector(selecionarEventos).find((evento) => evento.id === eventoId) as Evento;

  const [openModal, setOpenModal] = useState(false);
  const [valorTitulo, setValorTitulo] = useState(evento.titulo);
  const [valorData, setValorData] = useState(new Date(evento.data));
  const [valorParticipante, setValorParticipante] = useState('');
  const [valorDinheiroParticipante, setValorDinheiroParticipante] = useState('');
  const [participantes, setParticipantes] = useState<Participante[]>(evento.participantes);

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
  
  const enviarFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(atualizarEvento({
      id: evento.id,
      data: valorData.toString(),
      titulo: valorTitulo,
      participantes: participantes,
    }));
    setOpenModal(false);
  };

  return (
    <PaginaLayoutWrapper>
      <button className={styles['botao-editar']} onClick={() => setOpenModal(true)}>{'\u2710'}</button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles['modal-container']}>
          <FormularioEvento
            onSubmit={(e) => enviarFormulario(e)}
            participantes={participantes}
            setParticipantes={setParticipantes}
            setValorData={setValorData}
            setValorDinheiroParticipante={setValorDinheiroParticipante}
            setValorParticipante={setValorParticipante}
            setValorTitulo={setValorTitulo}
            textoBotaoEnvio="Atualizar Evento"
            valorData={valorData}
            valorDinheiroParticipante={valorDinheiroParticipante}
            valorParticipante={valorParticipante}
            valorTitulo={valorTitulo}
          />
        </div>
      </Modal>

      <Grid container>
        <Grid item xs={12} lg={12}>
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
