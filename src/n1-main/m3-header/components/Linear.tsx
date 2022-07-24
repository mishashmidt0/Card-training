import * as React from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector } from '../../../n5-bll/redux';
import s from '../HeaderStyle.module.css';

export const Linear = (): ReturnComponentType => {
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
