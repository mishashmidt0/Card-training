import { handleNetworkError } from '../../../n2-auth/a4-utils/handle-error-utils';
import { TypedDispatch } from '../../../n5-bll/redux';
import { loading } from '../../m0-App/app-reducer';

import { cardPackApi, CardPackDataType } from './cardPackAPI';

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
  token: '20f16090-fb09-11ec-a77b-458deadef84b',
  tokenDeathTime: 1657482516761,
};

export const cardPackReducer = (
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
export const getCardsPacksTC = () => async (dispatch: TypedDispatch) => {
  dispatch(loading(true));
  try {
    const res = await cardPackApi.getAllCardPack();

    dispatch(getCardsPacksAC(res.data));
  } catch (error: any) {
    handleNetworkError(error, dispatch);
  } finally {
    dispatch(loading(false));
  }
};
// n4-types
export type CardsPacksActionsType = ReturnType<typeof getCardsPacksAC>;
type InitialStateType = typeof initialState;
