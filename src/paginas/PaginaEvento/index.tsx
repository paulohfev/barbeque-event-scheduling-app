import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import PaginaLayoutWrapper from '../../layouts/PaginaLayoutWrapper';
import styles from './PaginaEvento.module.scss';

const PaginaEvento: React.FC = () => {
  const { id } = useParams();

  return (
    <PaginaLayoutWrapper>
      <Grid container>
        <Grid item>
          <div className={styles['container']}>
            yrd
          </div>
        </Grid>
      </Grid>
    </PaginaLayoutWrapper>
  );
};

export default PaginaEvento;
