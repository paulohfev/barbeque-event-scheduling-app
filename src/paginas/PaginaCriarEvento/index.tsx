import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { uniqueId } from 'lodash';
import FormularioEvento from '../../componentes/FormularioEvento';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import { useAppDispatch } from '../../store/hooks';
import { adicionarEventos } from '../../store/slices/eventosSlice';
import { Rotas } from '../../enums/rotas';
import { Participante } from '../../interfaces/Participante';
import styles from './PaginaCriarEvento.module.scss';

const PaginaCriarEvento: React.FC = () => {
  const dispatch = useAppDispatch();
  const [valorTitulo, setValorTitulo] = useState('');
  const [valorData, setValorData] = useState(new Date());
  const [valorParticipante, setValorParticipante] = useState('');
  const [valorDinheiroParticipante, setValorDinheiroParticipante] = useState('');
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const navigate = useNavigate();

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
        <Grid item xs={12} lg={12} className={styles['grid-item']}>
          <div className={styles['container']}>
            <FormularioEvento
              onSubmit={enviarFormulario}
              participantes={participantes}
              setParticipantes={setParticipantes}
              setValorData={setValorData}
              setValorDinheiroParticipante={setValorDinheiroParticipante}
              setValorParticipante={setValorParticipante}
              setValorTitulo={setValorTitulo}
              textoBotaoEnvio="Adicionar Evento"
              valorData={valorData}
              valorDinheiroParticipante={valorDinheiroParticipante}
              valorParticipante={valorParticipante}
              valorTitulo={valorTitulo}
            />
          </div>
        </Grid>
      </Grid>
    </PaginaLayoutWrapper>
  )
};

export default PaginaCriarEvento;
