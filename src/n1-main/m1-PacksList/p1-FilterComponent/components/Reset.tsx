import React from 'react';

import Button from '@mui/material/Button';

import { ReturnComponentType } from '../../../../n4-types';
import { useTypedDispatch } from '../../../../n5-bll/redux';
import { changeFilterPacksTC } from '../filter-reducer';

export const Reset = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();

  const reset = (): void => {
    const payload = {
      isShowCards: 'all',
      pageCount: 10,
      min: 0,
      max: 20,
      packName: '',
    };

    dispatch(changeFilterPacksTC(payload));
  };

  return (
    <div>
      <Button variant="contained" onClick={reset}>
        Reset filters
      </Button>
    </div>
  );
};
