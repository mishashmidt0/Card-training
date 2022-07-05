import React, { useEffect } from 'react';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';

import { getCardsTC } from './cards-reducer';

export const Cards = (): ReturnComponentType => {
  // eslint-disable-next-line no-underscore-dangle,no-magic-numbers
  const cardsPackId = useAppSelector(state => state.cardsPacks.cardPacks[4]._id);
  // eslint-disable-next-line no-magic-numbers
  const cards = useAppSelector(state => state.cards.cards[2].question);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-magic-numbers
    dispatch(getCardsTC({ cardsPack_id: cardsPackId, page: 1, pageCount: 10 }));
  }, [dispatch, cardsPackId]);

  return <div>{cards}</div>;
};
