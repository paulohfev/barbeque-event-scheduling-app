import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { Grid } from '@mui/material';
import classNames from 'classnames';
import { uniqueId } from 'lodash';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import { Participante } from '../../interfaces/Participante';
import { formatarParaMoeda } from '../../utilidades/conteudo';
import { useAppDispatch } from '../../store/hooks';
import { adicionarEventos } from '../../store/slices/eventosSlice';
import { Rotas } from '../../enums/rotas';
import styles from './PaginaCriarEvento.module.scss';

const PaginaCriarEvento: React.FC = () => {
  const dispatch = useAppDispatch();
  const [valorTitulo, setValorTitulo] = useState('');
  const [valorData, setValorData] = useState(new Date());
  const [valorParticipante, setValorParticipante] = useState('');
  const [valorDinheiroParticipante, setValorDinheiroParticipante] = useState('');
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const navigate = useNavigate();

  const camposEstaoPreenchidos = (valorTitulo !== '') && participantes.length !== 0;

  const adicionarItemLista = () => {
    const itemParticipante = {
      id: uniqueId(),
      nome: valorParticipante,
      valor: valorDinheiroParticipante,
      confirmado: false,
    };
  
    setParticipantes((prevState) => [...prevState, itemParticipante]);
    setValorParticipante('');
    setValorDinheiroParticipante('')
  };

  const removerItemLista = (id: number) => {
    const participantesFiltrados =
      participantes.filter((part: Participante) => id !== participantes.indexOf(part));

    setParticipantes(participantesFiltrados);
  };

  const renderizarParticipantesAdicionados = () => {
    return participantes.map((participante, index) => {
      return (
        <div className={styles['container-item-participante']} key={participante.id}>
          <div className={styles['container-item-texto']}>
            <p className={styles['item-participante-texto']}>{participante.nome}</p>
            <p className={styles['item-participante-texto']}>{formatarParaMoeda(participante.valor)}</p>
          </div>

          <span className={styles['remover-item-participante']} onClick={() => removerItemLista(index)}>
            x
          </span>
        </div>
      );
    });
  };

  const enviarFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(adicionarEventos({
      id: uniqueId(),
      data: valorData.toString(),
      titulo: valorTitulo,
      participantes: participantes,
    }));
    navigate(Rotas.root);
  };

  return (
    <PaginaLayoutWrapper>
      <Grid container>
        <Grid item xs={12} lg={10} className={styles['grid-item']}>
          <div className={styles['container']}>
            <form className={styles['formulario']} onSubmit={(e) => enviarFormulario(e)}>
              <label className={styles['rotulo']}>Data</label>
              <DatePicker className={styles['campo']} selected={valorData} onChange={(data: Date) => setValorData(data)} />

              <label className={styles['rotulo']}>Título</label>
              <input
                className={styles['campo']}
                onChange={(e) => setValorTitulo(e.target.value)}
                placeholder="Título"
                type="text"
                value={valorTitulo}
              />

              <label className={styles['rotulo']}>Participantes</label>
              <div className={styles['container-campo-participantes']}>
                <input
                  className={classNames(styles['campo'], styles['campo-participantes'])}
                  onChange={(e) => setValorParticipante(e.target.value)}
                  placeholder="Adicionar Participante"
                  type="text"
                  value={valorParticipante}
                />
                <input
                  className={classNames(styles['campo'], styles['campo-participantes'])}
                  onChange={(e) => setValorDinheiroParticipante(e.target.value)}
                  placeholder="0"
                  type="number"
                  value={valorDinheiroParticipante}
                />
                <span className={styles['adicionar-participante']} onClick={() => adicionarItemLista()}>+</span>
              </div>

              <div className={styles['lista-participantes-adicionados']}>
                {renderizarParticipantesAdicionados()}
              </div>

              <button className={styles['botao-envio']} disabled={!camposEstaoPreenchidos} type="submit">Adicionar Evento</button>
            </form>
          </div>
        </Grid>
      </Grid>
    </PaginaLayoutWrapper>
  )
};

export default PaginaCriarEvento;
