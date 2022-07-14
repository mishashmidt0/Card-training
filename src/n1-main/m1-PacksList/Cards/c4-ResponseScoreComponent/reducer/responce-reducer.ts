// reducer
import { v4 as uuidv4 } from 'uuid';

import { handleNetworkError } from '../../../../../n2-auth/a4-utils/handle-error-utils';
import { TypedDispatch } from '../../../../../n5-bll/redux';
import { loading } from '../../../../m0-App/app-reducer';
import { cardsPacksAPI, payloadGrade } from '../../../CardsPacks/cardsPacksAPI';
import { Star } from '../../../p3-enums/enums';
import { changeGradeAC } from '../../cards-reducer';
import style from '../style/ResponseScoreComponent.module.css';

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
  cardDate: {
    grade: 1,
    card_id: '',
  },
};

export const ResponseReducer = (
  // eslint-disable-next-line default-param-last
  state: initialStateType = initialState,
  action: ResActionType,
): initialStateType => {
  switch (action.type) {
    case ActionTypeForResponse.changeStyleStars:
      return {
        ...state,
        starsArr: state.starsArr.map(star =>
          star.num <= action.index
            ? { ...star, activeStyle: action.style }
            : { ...star, activeStyle: '' },
        ),
      };

    default:
      return state;
  }
};

// action
export const changeStyleStars = (index: number, style: string) =>
  ({ type: ActionTypeForResponse.changeStyleStars, index, style } as const);

// thunk

export const sendGradeTC = () => async (dispatch: TypedDispatch) => {
  dispatch(loading(true));
  try {
    const payload = {
      grade: 1,
      card_id: '',
    };
    const res = await cardsPacksAPI.sendGrade(payload);

    dispatch(changeGradeAC(res));
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
  cardDate: payloadGrade;
};
