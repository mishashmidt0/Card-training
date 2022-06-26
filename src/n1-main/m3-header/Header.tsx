import React from 'react';
import s from './headerStyle.module.css';
import SearchAppBar from './SearchAppBar';

export const Header = () => {
  return (
    <div className={s.headerContainer}>
      <SearchAppBar />
    </div>
  );
};