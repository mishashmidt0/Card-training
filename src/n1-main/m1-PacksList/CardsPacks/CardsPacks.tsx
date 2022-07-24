import React, { useEffect } from 'react';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';

import { getCardsPacksTC } from './cardsPacks-reducer';
import s from './CardsPacks.module.css';
import { CardsPacksTable } from './e1-CardsPacksTable/CardsPacksTable';
import { CardsPacksPagination } from './e2-CardsPacksPagination/CardsPacksPagination';

export const CardsPacks = (): ReturnComponentType => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getCardsPacksTC(filter));
  }, []);

  return (
    <div className={s.cardsPacksContainer}>
      <CardsPacksTable />
      <CardsPacksPagination />
    </div>
  );
};
