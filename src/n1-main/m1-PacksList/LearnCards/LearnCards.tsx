import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';
import { getCardsTC } from '../Cards/cards-reducer';
import { CardsType } from '../Cards/cardsAPI';
import { forGetRandomCard, maxPageCount } from '../p4-constants/constants';

import s from './LearnCards.module.css';

export const LearnCards = (): ReturnComponentType => {
  const cards = useAppSelector(state => state.cards.cards);
  const { cardPackId } = useParams();
  const { cardPackName } = useParams();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (cards[0]._id === '5ebbd48876810f1ad0e7ece3') {
      dispatch(getCardsTC({ cardsPack_id: cardPackId, pageCount: maxPageCount }));
    }
  }, []);

  const getRandomCard = (cards: CardsType[]): CardsType => {
    const sum = cards.reduce(
      (acc, card) =>
        acc + (forGetRandomCard - card.grade) * (forGetRandomCard - card.grade),
      0,
    );
    const rand = Math.random() * sum;
    const res = cards.reduce(
      (acc: { sum: number; id: number }, card, i) => {
        const newSum =
          acc.sum + (forGetRandomCard - card.grade) * (forGetRandomCard - card.grade);

        return { sum: newSum, id: newSum < rand ? i : acc.id };
      },
      { sum: 0, id: -1 },
    );

    return cards[res.id + 1];
  };
  const card = getRandomCard(cards);

  return (
    <div className={s.learnCardsContainer}>
      <div className={s.cardPackName}>{cardPackName}</div>
      <div className={s.questionText}>Question: {card.question}</div>
      <div className={s.btnContainer}>
        <Button
          variant="outlined"
          style={{ background: 'white' }}
          className={s.btnCancel}
        >
          <Link to="/list">Cancel</Link>
        </Button>
        <Button variant="contained">
          <Link
            to={`/grade/${cardPackName}/${cardPackId}/${card._id}`}
            className={s.btnShowAnswer}
          >
            Show answer
          </Link>
        </Button>
      </div>
    </div>
  );
};
