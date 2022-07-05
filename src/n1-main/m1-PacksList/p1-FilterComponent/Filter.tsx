import React, { useCallback } from 'react';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';
import { ProfileStateType } from '../../m2-Profile/profile-reducer';
import { ResCardsPacksType } from '../CardsPacks/cardsPacksAPI';

import { RangeSlider } from './components/Range';
import { changesShowCardsTC, isShowCardsType } from './filter-reducer';
import style from './Filter.module.css';

enum FilterText {
  all = 'all',
  my = 'my',
}

export const Filter = (): ReturnComponentType => {
  const isShow = useAppSelector(state => state.filter.isShowCards);
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);
  const pageCount = useAppSelector(state => state.filter.pageCount);
  const dispatch = useTypedDispatch();
  const ChangeCards = (value: isShowCardsType): void => {
    const payload: ResCardsPacksType =
      value === FilterText.my ? { user_id: userId, pageCount } : { pageCount };

    dispatch(changesShowCardsTC(value, payload));
  };

  const CreateButton = useCallback(
    (isShow: string, text: isShowCardsType): ReturnComponentType => {
      return (
        <div
          role="button"
          tabIndex={0}
          onClick={() => ChangeCards(text)}
          onKeyPress={() => ChangeCards(text)}
          className={`${style.DivButton} ${
            isShow === text ? style.ActiveButton : style.DisableButton
          }`}
        >
          {text}
        </div>
      );
    },
    [isShow, pageCount],
  );

  return (
    <div className={style.FilterContainer}>
      <h2>Show packs cards</h2>
      <div className={style.ShowCardsContainer}>
        {CreateButton(isShow, FilterText.my)}
        {CreateButton(isShow, FilterText.all)}
      </div>
      <RangeSlider />
    </div>
  );
};
