import React from 'react';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector } from '../../../n5-bll/redux';

import { CardsTable } from './c1-CardsTable/CardsTable';
import { CardsPagination } from './c2-CardsPagination/CardsPagination';
import { SearchCard } from './c3-SearchComponent/SearchCard';
import s from './Cards.module.css';

export const Cards = (): ReturnComponentType => {
  const cardCount = useAppSelector(state => state.cards.cardsTotalCount);

  return (
    <div className={s.cardsContainer}>
      <SearchCard />
      {cardCount > 0 && (
        <>
          <CardsTable />
          <CardsPagination />
        </>
      )}
    </div>
  );
};
