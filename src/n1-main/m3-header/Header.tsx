import React from 'react';
import s from './headerStyle.module.css';
import SearchAppBar from './components/SearchAppBar';
import { Linear } from './Linear';

export const Header = () => {
  return (
    <div className={s.headerContainer}>
      <SearchAppBar />
      <Linear />
    </div>
  );
};
