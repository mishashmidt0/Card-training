import * as React from 'react';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { ProfileStateType } from '../../../m2-Profile/profile-reducer';
import { maxRangeValue, timeout } from '../../p4-constants/constants';
import { changeFilter, changeFilterPacksTC } from '../filter-reducer';
import style from '../Filter.module.css';

function valuetext(value: number): string {
  return `${value}`;
}

const debounce = <Params extends any[]>(
  func: (...arg: Params) => any,
  timeout: number,
): ((...arg: Params) => void) => {
  let timer: any;

  return (...arg: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...arg);
    }, timeout);
  };
};

export const RangeSlider = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const filter = useAppSelector(state => state.filter);
  const { packName, isShowCards, pageCount } = filter;
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);
  const isLoad = useAppSelector(state => state.app.loading);

  const setRange = useCallback(
    (newValue: number | number[]): void => {
      const [min, max] = newValue as number[];
      const payload = { ...filter, min, max };

      dispatch(changeFilterPacksTC(payload));
    },
    [filter, userId],
  );

  const debounceRange = debounce(setRange, timeout);

  const changeRange = useCallback(
    (event: Event, newValue: number | number[]): void => {
      const [min, max] = newValue as number[];

      debounceRange(newValue as number[]);
      dispatch(changeFilter({ min, max }));
    },
    [packName, isShowCards, pageCount],
  );

  return (
    <div className={style.rangeContainer}>
      <h2>Number of cards</h2>
      <div className={style.Range}>
        <span className={style.valueRange}>{filter.min}</span>
        <Box sx={{ width: 200 }}>
          <Slider
            getAriaLabel={() => 'cards range'}
            value={[filter.min, filter.max]}
            onChange={changeRange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={maxRangeValue}
            disabled={isLoad}
          />
        </Box>
        <span className={style.valueRange}>{filter.max}</span>
      </div>
    </div>
  );
};
