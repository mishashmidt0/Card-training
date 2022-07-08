import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';

import { CardsTable } from './c1-CardsTable/CardsTable';
import { CardsPagination } from './c2-CardsPagination/CardsPagination';
import { SearchCard } from './c3-SearchComponent/SearchCard';
import { getCardsTC } from './cards-reducer';
import s from './Cards.module.css';

export const Cards = (): ReturnComponentType => {
  const cardCount = useAppSelector(state => state.cards.cardsTotalCount);
  const { cardPackId } = useParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-magic-numbers
    dispatch(getCardsTC({ cardsPack_id: cardPackId, page: 1, pageCount: 10 }));
  }, [cardPackId]);

  return (
    <div className={s.container}>
      <div className={s.cardsContainer}>
        <SearchCard />
        {cardCount > 0 && (
          <>
            <CardsTable />
            <CardsPagination />
          </>
        )}
        {cardCount === 0 && (
          <div className={s.emptyText}>
            The pack is empty. Click Add new card to fill this pack
          </div>
        )}
      </div>
    </div>
  );
};
