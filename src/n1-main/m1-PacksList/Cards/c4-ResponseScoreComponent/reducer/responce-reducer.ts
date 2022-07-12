// reducer
import { v4 as uuidv4 } from 'uuid';

import { Star } from '../../../p3-enums/enums';
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

// export const changeFilterPacksTC =
//   (payload: ResCardsPacksType) => async (dispatch: TypedDispatch) => {
//     dispatch(loading(true));
//     try {
//       const res = await cardsPacksAPI.getCardsPacks(payload);
//
//       dispatch(getCardsPacksAC(res.data));
//       dispatch(changeFilter(payload));
//     } catch (err: any) {
//       handleNetworkError(err, dispatch);
//     } finally {
//       dispatch(loading(false));
//     }
//   };

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
};
