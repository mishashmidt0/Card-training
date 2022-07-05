import * as React from 'react';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { ProfileStateType } from '../../../m2-Profile/profile-reducer';
import { changeFilterPacksTC } from '../filter-reducer';
import style from '../Filter.module.css';

import { FilterText } from './MyAllButton';

function valuetext(value: number): string {
  return `${value}`;
}
const maxRangeValue = 20;

export const RangeSlider = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const filter = useAppSelector(state => state.filter);
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);
  const isLoad = useAppSelector(state => state.app.loading);

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]): void => {
      const [min, max] = newValue as number[];
      const payload =
        filter.isShowCards === FilterText.my
          ? { user_id: userId, ...filter, min, max }
          : { ...filter, min, max };

      dispatch(changeFilterPacksTC(payload));
    },
    [filter],
  );

  return (
    <>
      <h2>Number of cards</h2>
      <div className={style.Range}>
        <span className={style.valueRange}>{filter.min}</span>
        <Box sx={{ width: 200 }}>
          <Slider
            getAriaLabel={() => 'cards range'}
            value={[filter.min, filter.max]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={maxRangeValue}
            disabled={isLoad}
          />
        </Box>
        <span className={style.valueRange}>{filter.max}</span>
      </div>
    </>
  );
};
