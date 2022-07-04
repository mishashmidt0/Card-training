import React from 'react';

import { ReturnComponentType } from '../../n4-types';

import { CardsPacks } from './CardsPacks/CardsPacks';
import s from './PecksList.module.css';

export const PecksList = (): ReturnComponentType => {
  return (
    <div className={s.packListContainer}>
      <CardsPacks />
    </div>
  );
};
