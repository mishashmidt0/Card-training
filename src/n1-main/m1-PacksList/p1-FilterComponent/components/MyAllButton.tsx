import React, { useCallback } from 'react';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { ProfileStateType } from '../../../m2-Profile/profile-reducer';
import { ResCardsPacksType } from '../../CardsPacks/cardsPacksAPI';
import { FilterText } from '../../p3-enums/enums';
import { changesShowCardsTC, isShowCardsType } from '../filter-reducer';
import style from '../Filter.module.css';

export const MyAllButton = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const isShow = useAppSelector(state => state.filter.isShowCards);
  const userId = useAppSelector(state => (state.profile.profile as ProfileStateType)._id);
  const filter = useAppSelector(state => state.filter);

  const ChangeCards = (value: isShowCardsType): void => {
    const payload: ResCardsPacksType =
      value === FilterText.my
        ? { ...filter, user_id: userId }
        : { ...filter, user_id: '' };

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
    [isShow, filter],
  );

  return (
    <div>
      <h2>{FilterText.header}</h2>
      <div className={style.ShowCardsContainer}>
        {CreateButton(isShow, FilterText.my)}
        {CreateButton(isShow, FilterText.all)}
      </div>
    </div>
  );
};
