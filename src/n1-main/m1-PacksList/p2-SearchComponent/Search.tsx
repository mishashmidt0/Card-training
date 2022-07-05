import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';
import { ProfileStateType } from '../../m2-Profile/profile-reducer';
import { FilterText } from '../p1-FilterComponent/components/MyAllButton';
import { changeFilterPacksTC } from '../p1-FilterComponent/filter-reducer';

import style from './Search.module.css';

const debounce = <Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): ((...args: Params) => void) => {
  let timer: any;

  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
const timeout = 600;

export const Search = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const filter = useAppSelector(state => state.filter);
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);

  function search(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;

    const payload =
      filter.isShowCards === FilterText.my
        ? { user_id: userId, ...filter, packName: value }
        : { ...filter, packName: value };

    dispatch(changeFilterPacksTC(payload));
  }

  const searchDebounce = debounce(search, timeout);

  return (
    <div className={style.containerSearchAndButton}>
      <div className={style.SearchContainer}>
        <SearchIcon sx={{ color: 'white' }} />
        <input
          type="text"
          className={style.search}
          placeholder="Search..."
          onChange={searchDebounce}
        />
      </div>
      <Button variant="contained">Create new pack</Button>
    </div>
  );
};
