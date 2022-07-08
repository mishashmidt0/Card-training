import React, { useEffect } from 'react';

import { ReturnComponentType } from '../../../n4-types';
import { useTypedDispatch } from '../../../n5-bll/redux';
import { resetPayload } from '../p4-constants/constants';

import { getCardsPacksTC } from './cardsPacks-reducer';
import s from './CardsPacks.module.css';
import { CardsPacksTable } from './e1-CardsPacksTable/CardsPacksTable';
import { CardsPacksPagination } from './e2-CardsPacksPagination/CardsPacksPagination';

export const CardsPacks = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getCardsPacksTC(resetPayload));
  }, []);

  return (
    <div className={s.cardsPacksContainer}>
      <CardsPacksTable />
      <CardsPacksPagination />
    </div>
  );
};
