import React, { useCallback, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../../n4-types';
import { useTypedDispatch } from '../../../../n5-bll/redux';
import { timeout } from '../../p4-constants/constants';
import { getCardsTC } from '../cards-reducer';

import { AddCardWithChildren } from './AddCard/AddCardWithChildren';
import s from './SearchCard.module.css';

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

export const SearchCard = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const { cardPackId } = useParams();

  const [searchValue, setSearchValue] = useState('');

  const search = useCallback(
    (value: string): void => {
      const payload = {
        cardsPack_id: cardPackId,
        cardQuestion: value,
        page: 1,
        pageCount: 10,
      };

      dispatch(getCardsTC(payload));
    },
    [cardPackId],
  );

  const searchDebounce = debounce(search, timeout);

  const changeSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    searchDebounce(value);
    setSearchValue(value);
  }, []);

  return (
    <div className={s.containerSearchAndButton}>
      <div className={s.SearchContainer}>
        <SearchIcon sx={{ color: 'black', margin: '0 5px' }} />
        <input
          type="text"
          className={s.search}
          placeholder="Search..."
          onChange={e => changeSearch(e)}
          value={searchValue}
        />
      </div>
      <AddCardWithChildren />
    </div>
  );
};
