import React from 'react';

import { ReturnComponentType } from '../../n4-types';

import { CardPack } from './CardPack/CardPack';
import s from './PecksList.module.css';

export const PecksList = (): ReturnComponentType => {
  return (
    <div className={s.packListContainer}>
      <CardPack />
    </div>
  );
};
