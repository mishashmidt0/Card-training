import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import { ReturnComponentType } from '../../../n4-types';

import style from './Search.module.css';

export const Search = (): ReturnComponentType => {
  return (
    <div className={style.containerSearchAndButton}>
      <div className={style.SearchContainer}>
        <SearchIcon sx={{ color: 'white' }} />
        <input type="text" className={style.search} placeholder="Search..." />
      </div>
      <Button variant="contained">Create new pack</Button>
    </div>
  );
};
