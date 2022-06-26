import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import s from './headerStyle.module.css';
import { useAppSelector } from '../../n10-bll/redux';

export const Linear = () => {
  const isLoad = useAppSelector(state => state.app.loading);

  return (
    <div className={s.linear}>
      {isLoad && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
};
