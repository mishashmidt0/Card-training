import React, { useEffect } from 'react';

import Button from '@mui/material/Button/Button';
import { Link, useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { GlobalLoadingComponent } from '../../../m0-App/GlobalLoading/GlobalLoadingComponent';
import { initPageCount } from '../../p4-constants/constants';
import { getCardsTC } from '../cards-reducer';

import { sendGradeTC } from './reducer/grade-reducer';
import { Stars } from './stars/Stars';
import style from './style/GradeComponent.module.css';

export const GradeComponent = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const { cardPackId } = useParams();
  const { cardId } = useParams();
  const { cardPackName } = useParams();

  const cards = useAppSelector(state => state.cards.cards);
  const card = cards.filter(c => c._id === cardId);

  const sendGrade = (): void => {
    dispatch(sendGradeTC(cardId!));
  };

  useEffect(() => {
    if (!card.length) {
      dispatch(getCardsTC({ cardsPack_id: cardPackId, pageCount: initPageCount }));
    }
  }, []);

  const createText = (spanText: string, text?: string): ReturnComponentType => {
    return (
      <p>
        <span>{spanText} </span>
        {text}
      </p>
    );
  };

  const createButton = (
    link: string,
    text: string,
    func: () => void,
  ): ReturnComponentType => {
    return (
      <Button variant="contained" onClick={func}>
        <Link to={link} style={{ color: 'white' }}>
          {text}
        </Link>
      </Button>
    );
  };

  return !card.length ? (
    <GlobalLoadingComponent />
  ) : (
    <div className={style.GradeContainer}>
      {createText('Question: ', card[0].question)}
      {createText('Answer: ', card[0].answer)}
      {createText('Rate yourself:', '')}
      <Stars />
      <div className={style.buttonContainer}>
        {createButton('/list', 'Cancel', () => {})}
        {createButton(`/learn/${cardPackName}/${cardPackId}`, 'Next question', sendGrade)}
      </div>
    </div>
  );
};
