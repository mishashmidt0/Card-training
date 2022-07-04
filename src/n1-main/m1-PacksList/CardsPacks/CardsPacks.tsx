import React, { useEffect } from 'react';

import { ReturnComponentType } from '../../../n4-types';
import { useTypedDispatch } from '../../../n5-bll/redux';

import { CardPackTable } from './CardPack/CardPackTable';
import { getCardsPacksTC } from './cardsPacks-reducer';

export const CardsPacks = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getCardsPacksTC());
  }, [dispatch]);

  return (
    <div>
      <CardPackTable />
    </div>
  );
};
