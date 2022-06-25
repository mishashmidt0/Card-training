import React from 'react';
import gif from './assets/ZSix.gif';
import err from './assets/404.png';
import s from './errorStyle.module.css';

export const Error = () => {
  return (
    <div className={s.errorContainer}>
      <img src={err} alt="4042" />
      <img src={gif} alt="404" />
    </div>
  );
};
