import React, { useEffect } from 'react';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';

import { getCardsPacksTC } from './cardPack-reducer';

export const CardPack = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const cardsPacks = useAppSelector(state => state.cardsPacks.cardPacks);

  console.log('component', cardsPacks);
  useEffect(() => {
    dispatch(getCardsPacksTC());
  }, [dispatch]);

  return <div>asdasdasdasd</div>;
};
