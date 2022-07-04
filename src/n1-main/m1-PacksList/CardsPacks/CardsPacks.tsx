import React, { useEffect } from 'react';

import { ReturnComponentType } from '../../../n4-types';
import { useTypedDispatch } from '../../../n5-bll/redux';

import { getCardsPacksTC } from './cardsPacks-reducer';
import { CardsPacksTable } from './e1-CardsPacksTable/CardsPacksTable';
import { CardsPacksPagination } from './e2-CardsPacksPagination/CardsPacksPagination';

export const CardsPacks = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getCardsPacksTC());
  }, [dispatch]);

  return (
    <div>
      <CardsPacksTable />
      <CardsPacksPagination />
    </div>
  );
};
