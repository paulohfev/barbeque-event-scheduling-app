import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import classNames from 'classnames';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import { formatarParaMoeda } from '../../utilidades/conteudo';
import styles from './PaginaCriarEvento.module.scss';

type ItemParticipante = {
  nome: string;
  valor: string;
}

const PaginaCriarEvento: React.FC = () => {
  const [valorDescricao, setValorDescricao] = useState('');
  const [valorData, setValorData] = useState(new Date());
  const [valorParticipante, setValorParticipante] = useState('');
  const [valorDinheiroParticipante, setValorDinheiroParticipante] = useState('');
  const [participantes, setParticipantes] = useState<ItemParticipante[]>([]);

  const adicionarItemLista = () => {
    const itemParticipante = {
      nome: valorParticipante,
      valor: valorDinheiroParticipante,
    };
  
    setParticipantes((prevState) => [...prevState, itemParticipante]);
    setValorParticipante('');
    setValorDinheiroParticipante('')
  };

  const removerItemLista = (id: number) => {
    const participantesFiltrados =
      participantes.filter((part: ItemParticipante) => id !== participantes.indexOf(part));

    setParticipantes(participantesFiltrados);
  };

  const renderizarParticipantesAdicionados = () => {
    return participantes.map((participante, index) => {
      return (
        <div className={styles['container-item-participante']} key={index}>
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
  };

  return (
    <PaginaLayoutWrapper>
      <div className={styles['container']}>
        <form className={styles['formulario']} onSubmit={(e) => enviarFormulario(e)}>
          <label className={styles['rotulo']}>Data</label>
          <DatePicker className={styles['campo']} selected={valorData} onChange={(data: Date) => setValorData(data)} />

          <label className={styles['rotulo']}>Descrição</label>
          <input
            className={styles['campo']}
            onChange={(e) => setValorDescricao(e.target.value)}
            placeholder="Descrição"
            type="text"
            value={valorDescricao}
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

          <button className={styles['botao-envio']} type="submit">Adicionar Evento</button>
        </form>
      </div>
    </PaginaLayoutWrapper>
  )
};

export default PaginaCriarEvento;
