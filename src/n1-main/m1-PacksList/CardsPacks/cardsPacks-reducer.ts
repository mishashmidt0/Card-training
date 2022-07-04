import axios, { AxiosError } from 'axios';

import { handleNetworkError } from '../../../n2-auth/a4-utils/handle-error-utils';
import { TypedDispatch } from '../../../n5-bll/redux';
import { loading } from '../../m0-App/app-reducer';

import { cardsPacksAPI, CardPackDataType } from './cardsPacksAPI';

// enum
enum cardPackTypes {
  getCardsPacks = 'CARD-PACK/GET-CARD-PACK',
}

// reducer
const initialState: CardPackDataType = {
  cardPacks: [
    {
      cardsCount: 0,
      created: '2022-07-03T19:36:53.620Z',
      deckCover: '',
      grade: 0,
      more_id: '62b7263e0c5ba03050f3cfae',
      name: 'My new PACK',
      path: '/def',
      private: false,
      rating: 0,
      shots: 0,
      type: 'pack',
      updated: '2022-07-03T19:36:53.620Z',
      user_id: '62b7263e0c5ba03050f3cfae',
      user_name: 'Alex11',
      __v: 0,
      _id: '62c1efd5fade1626a007948f',
    },
  ],
  cardPacksTotalCount: 5410,
  maxCardsCount: 110,
  minCardsCount: 0,
  page: 1,
  pageCount: 4,
};

export const cardsPacksReducer = (
  // eslint-disable-next-line default-param-last
  state: InitialStateType = initialState,
  action: CardsPacksActionsType,
): CardPackDataType => {
  switch (action.type) {
    case cardPackTypes.getCardsPacks:
      return { ...state, ...action.cardsPacksData };
    default:
      return state;
  }
};

// actions
export const getCardsPacksAC = (cardsPacksData: CardPackDataType) =>
  ({ type: cardPackTypes.getCardsPacks, cardsPacksData } as const);
// thunks
export const getCardsPacksTC =
  (pageCount?: number, newPage?: number) => async (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    try {
      const res = await cardsPacksAPI.getCardsPacks(pageCount, newPage);

      dispatch(getCardsPacksAC(res.data));
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
export type CardsPacksActionsType = ReturnType<typeof getCardsPacksAC>;
type InitialStateType = typeof initialState;
