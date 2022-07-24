import React, { useCallback } from 'react';

import SearchIcon from '@mui/icons-material/Search';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';
import { ProfileStateType } from '../../m2-Profile/profile-reducer';
import {
  changeFilter,
  changeFilterPacksTC,
  PayloadType,
} from '../p1-FilterComponent/filter-reducer';
import { FilterText } from '../p3-enums/enums';
import { timeout } from '../p4-constants/constants';

import { AddPack } from './AddPack/AddPack';
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

export const Search = (): ReturnComponentType => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useTypedDispatch();
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);

  const search = useCallback(
    (value: string, filterProps: PayloadType): void => {
      const payload =
        filterProps.isShowCards === FilterText.my
          ? { user_id: userId, ...filterProps, packName: value }
          : { ...filterProps, packName: value };

      dispatch(changeFilterPacksTC(payload));
    },
    [filter],
  );

  const searchDebounce = debounce(search, timeout);

  const changeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, filterProps: PayloadType): void => {
      const { value } = event.target;

      dispatch(changeFilter({ packName: value }));
      searchDebounce(value, filterProps);
    },
    [],
  );

  return (
    <div className={style.containerSearchAndButton}>
      <div className={style.SearchContainer}>
        <SearchIcon sx={{ color: 'black' }} />
        <input
          type="text"
          className={style.search}
          placeholder="Search..."
          onChange={e => changeSearch(e, filter)}
          value={filter.packName}
        />
      </div>
      <AddPack />
    </div>
  );
};
