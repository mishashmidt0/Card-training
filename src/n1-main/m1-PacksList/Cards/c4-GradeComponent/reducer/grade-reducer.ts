// reducer
import { v4 as uuidv4 } from 'uuid';

import { handleNetworkError } from '../../../../../n2-auth/a4-utils/handle-error-utils';
import { AppRootStateType, TypedDispatch } from '../../../../../n5-bll/redux';
import { loading } from '../../../../m0-App/app-reducer';
import { cardsPacksAPI } from '../../../CardsPacks/cardsPacksAPI';
import { Star } from '../../../p3-enums/enums';
import style from '../style/GradeComponent.module.css';

enum ActionTypeForResponse {
  changeStyleStars = 'ActionTypeForResponse/changeStyleStars',
}

const initialState: initialStateType = {
  starsArr: [
    { id: uuidv4(), class: style[`star${Star.star1}`], activeStyle: '', num: Star.star1 },
    { id: uuidv4(), class: style[`star${Star.star2}`], activeStyle: '', num: Star.star2 },
    { id: uuidv4(), class: style[`star${Star.star3}`], activeStyle: '', num: Star.star3 },
    { id: uuidv4(), class: style[`star${Star.star4}`], activeStyle: '', num: Star.star4 },
    { id: uuidv4(), class: style[`star${Star.star5}`], activeStyle: '', num: Star.star5 },
  ],
  grade: 0,
};

export const GradeReducer = (
  // eslint-disable-next-line default-param-last
  state: initialStateType = initialState,
  action: ResActionType,
): initialStateType => {
  switch (action.type) {
    case ActionTypeForResponse.changeStyleStars:
      return {
        ...state,
        starsArr: state.starsArr.map(star =>
          star.num <= action.star
            ? { ...star, activeStyle: action.style }
            : { ...star, activeStyle: '' },
        ),
        grade: action.star,
      };
    default:
      return state;
  }
};

// action
export const changeStyleStars = (star: number, style: string) =>
  ({ type: ActionTypeForResponse.changeStyleStars, star, style } as const);

// thunk
export const sendGradeTC =
  (cardId: string) =>
  async (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
    const { grade } = getState().response;

    try {
      const payload = {
        grade,
        card_id: cardId,
      };

      await cardsPacksAPI.sendGrade(payload);
      dispatch(changeStyleStars(0, ''));
    } catch (err: any) {
      handleNetworkError(err, dispatch);
    } finally {
      dispatch(loading(false));
    }
  };

// type
export type changeStyleStarsType = ReturnType<typeof changeStyleStars>;

export type ResActionType = changeStyleStarsType;

type stars = {
  id: string;
  class: string;
  activeStyle: string;
  num: number;
};
type initialStateType = {
  starsArr: stars[];
  grade: number;
};
