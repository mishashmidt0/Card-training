import React from 'react';

import { ReturnComponentType } from '../../n4-types';

import { CardDeck } from './CardDeck/CardDeck';
import s from './PecksList.module.css';

export const PecksList = (): ReturnComponentType => {
  return (
    <div className={s.packListContainer}>
      <CardDeck />
    </div>
  );
};
