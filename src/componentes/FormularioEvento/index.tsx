import React from 'react';
import DatePicker from "react-datepicker";
import classNames from 'classnames';
import { uniqueId } from 'lodash';
import { Participante } from '../../interfaces/Participante';
import { formatarParaMoeda } from '../../utilidades/conteudo';
import styles from './FormularioEvento.module.scss';

type Props = {
  onSubmit: (T: React.FormEvent<HTMLFormElement>) => void;
  participantes: Participante[];
  setParticipantes: (T: any) => void;
  setValorData: (T: Date) => void;
  setValorDinheiroParticipante: (T: string) => void;
  setValorParticipante: (T: string) => void;
  setValorTitulo: (T: string) => void;
  valorData: Date;
  valorDinheiroParticipante: string;
  valorParticipante: string;
  valorTitulo: string;
}

const FormularioEvento: React.FC<Props> = ({
  onSubmit,
  participantes,
  setParticipantes,
  setValorData,
  setValorDinheiroParticipante,
  setValorParticipante,
  setValorTitulo,
  valorData,
  valorDinheiroParticipante,
  valorParticipante,
  valorTitulo,
}) => {
  const camposEstaoPreenchidos = (valorTitulo !== '') && participantes.length !== 0;

  const adicionarItemLista = () => {
    const itemParticipante = {
      id: uniqueId(),
      nome: valorParticipante,
      valor: valorDinheiroParticipante,
      confirmado: false,
    };
  
    setParticipantes((prevState: Participante[]) => [...prevState, itemParticipante]);
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

  return (
    <form className={styles['formulario']} onSubmit={(e) => onSubmit(e)}>
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
  )
};

export default FormularioEvento;
