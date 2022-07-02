import React from 'react';

import { ReturnComponentType } from '../n4-types';

import err from './assets/404.png';
import gif from './assets/ZSix.gif';
import s from './errorStyle.module.css';

export const Error = (): ReturnComponentType => {
  return (
    <div className={s.errorContainer}>
      <img src={err} alt="402" />
      <img src={gif} alt="404" />
    </div>
  );
};
