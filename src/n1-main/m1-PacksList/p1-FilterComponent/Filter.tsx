import React from 'react';

import { ReturnComponentType } from '../../../n4-types';

import { MyAllButton } from './components/MyAllButton';
import { RangeSlider } from './components/Range';
import style from './Filter.module.css';

export const Filter = (): ReturnComponentType => {
  return (
    <div className={style.FilterContainer}>
      <MyAllButton />

      <RangeSlider />
    </div>
  );
};
