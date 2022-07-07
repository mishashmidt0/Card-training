import React from 'react';

import { ReturnComponentType } from '../../../n4-types';

import { CardsTable } from './c1-CardsTable/CardsTable';
import { CardsPagination } from './c2-CardsPagination/CardsPagination';
import s from './Cards.module.css';

export const Cards = (): ReturnComponentType => {
  return (
    <div className={s.cardsContainer}>
      <CardsTable />
      <CardsPagination />
    </div>
  );
};
