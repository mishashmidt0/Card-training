import React from 'react';

import Button from '@mui/material/Button';

import { ReturnComponentType } from '../../../../n4-types';
import { useTypedDispatch } from '../../../../n5-bll/redux';
import { ResetTitle } from '../../p3-enums/enums';
import { resetPayload } from '../../p4-constants/constants';
import { changeFilterPacksTC } from '../filter-reducer';

export const Reset = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();

  const reset = (): void => {
    dispatch(changeFilterPacksTC(resetPayload));
  };

  return (
    <div>
      <Button variant="contained" onClick={reset}>
        {ResetTitle.button}
      </Button>
    </div>
  );
};
