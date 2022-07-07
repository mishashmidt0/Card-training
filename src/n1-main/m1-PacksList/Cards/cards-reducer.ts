import axios, { AxiosError } from 'axios';

import { handleNetworkError } from '../../../n2-auth/a4-utils/handle-error-utils';
import { TypedDispatch } from '../../../n5-bll/redux';
import { loading } from '../../m0-App/app-reducer';

import { cardsAPI, CardsDataType, ResCardsType } from './cardsAPI';

// enum
enum cardsTypes {
  getCards = 'CARDS/GET-CARDS',
}

// reducer
const initialState: CardsDataType = {
  cards: [
    {
      answer: 'no answer',
      question: 'no question',
      cardsPack_id: '5eb6a2f72f849402d46c6ac4',
      grade: 4.987525071790364,
      rating: 0,
      shots: 1,
      type: 'card',
      user_id: '142151531535151',
      created: '2020-05-13T11:05:44.867Z',
      updated: '2020-05-13T11:05:44.867Z',
      __v: 0,
      _id: '5ebbd48876810f1ad0e7ece3',
    },
  ],
  cardsTotalCount: 3,
  maxGrade: 4.987525071790364,
  minGrade: 2.0100984354076568,
  page: 1,
  pageCount: 4,
  packUserId: '5eecf82a3ed8f700042f1186',
};

export const cardsReducer = (
  // eslint-disable-next-line default-param-last
  state: InitialStateType = initialState,
  action: CardsActionsType,
): CardsDataType => {
  switch (action.type) {
    case cardsTypes.getCards:
      return { ...action.cardsData };
    default:
      return state;
  }
};

// actions
export const getCardsAC = (cardsData: CardsDataType) =>
  ({ type: cardsTypes.getCards, cardsData } as const);
// thunks
export const getCardsTC = (payload: ResCardsType) => async (dispatch: TypedDispatch) => {
  dispatch(loading(true));
  try {
    const res = await cardsAPI.getCards(payload);

    dispatch(getCardsAC(res.data));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;

    if (axios.isAxiosError(err)) {
      handleNetworkError(err, dispatch);
    }
  } finally {
    dispatch(loading(false));
  }
};
// n4-types
export type CardsActionsType = ReturnType<typeof getCardsAC>;
type InitialStateType = typeof initialState;