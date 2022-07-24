import React from 'react';

import { ReturnComponentType } from '../../../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../../../n5-bll/redux';
import { Star } from '../../../p3-enums/enums';
import { changeStyleStars } from '../reducer/grade-reducer';
import style from '../style/GradeComponent.module.css';

export const Stars = (): ReturnComponentType => {
  const dispatch = useTypedDispatch();
  const stars = useAppSelector(state => state.response.starsArr);
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

  return (
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
                readOnly
                onClick={() => isChecked(index + 1)}
              />
            </label>
          ))}
        </form>
      </div>
    </div>
  );
};
