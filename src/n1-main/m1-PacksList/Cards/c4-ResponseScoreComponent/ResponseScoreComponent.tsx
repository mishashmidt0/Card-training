import React, { useEffect } from 'react';

import Button from '@mui/material/Button/Button';
import { Link, useParams } from 'react-router-dom';

import { ReturnComponentType } from '../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../n5-bll/redux';
import { Star } from '../../p3-enums/enums';
import { getCardsTC } from '../cards-reducer';

import { changeStyleStars } from './reducer/responce-reducer';
import style from './style/ResponseScoreComponent.module.css';

export const ResponseScoreComponent = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const { cardPackId } = useParams();
  const { cardId } = useParams();
  const { cardPackName } = useParams();
  const stars = useAppSelector(state => state.response.starsArr);
  const cards = useAppSelector(state => state.cards.cards);

  useEffect(() => {
    // eslint-disable-next-line no-magic-numbers
    dispatch(getCardsTC({ cardsPack_id: cardPackId, pageCount: 1000 }));
  }, [cardPackId]);

  const isChecked = (index: number): void => {
    switch (index) {
      case Star.star1:
      case Star.star2:
        dispatch(changeStyleStars(index, 'starDownChecked'));
        break;
      case Star.star3:
      case Star.star4:
        dispatch(changeStyleStars(index, 'starMiddleChecked'));
        break;
      case Star.star5:
        dispatch(changeStyleStars(index, 'starAllChecked'));
        break;
      default:
        break;
    }
  };

  // eslint-disable-next-line no-underscore-dangle
  const card = cards.filter(c => c._id === cardId);

  return (
    <div className={style.ResponseScoreContainer}>
      <div>
        <p>Question: {card[0].question}</p>
        <p>Answer: {card[0].answer}</p>
        <p>Rate yourself:</p>

        <div className={style.cont}>
          <div className={style.stars}>
            <form action="">
              {stars.map((star, index) => (
                <label
                  key={star.id}
                  className={`${style.star} ${star.class} ${style[star.activeStyle]}`}
                  htmlFor={`star-${star.class}`}
                >
                  <input
                    aria-label="qwe"
                    className={`${style.star} ${star.class}`}
                    id={`star-${star.class}`}
                    type="radio"
                    name="star"
                    checked
                    onClick={() => isChecked(index + 1)}
                  />
                </label>
              ))}
            </form>
          </div>
        </div>
        <Button variant="contained">
          <Link to="/list" style={{ color: 'white' }}>
            Cancel
          </Link>
        </Button>
        <Button variant="contained">
          <Link to={`/learn/${cardPackName}/${cardPackId}`} style={{ color: 'white' }}>
            Next question
          </Link>
        </Button>
      </div>
    </div>
  );
};
