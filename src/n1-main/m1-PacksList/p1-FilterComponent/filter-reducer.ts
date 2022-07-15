// enum
import { handleNetworkError } from '../../../n2-auth/a4-utils/handle-error-utils';
import { TypedDispatch } from '../../../n5-bll/redux';
import { loading } from '../../m0-App/app-reducer';
import { getCardsPacksAC, getCardsPacksTC } from '../CardsPacks/cardsPacks-reducer';
import {
  cardsPacksAPI,
  createCardsPackType,
  ResCardsPacksType,
} from '../CardsPacks/cardsPacksAPI';
import { ActionTypeForFilter } from '../p3-enums/enums';
import { initPageCount, maxRangeValue, minRangeValue } from '../p4-constants/constants';

// reducer
const initialState: initialStateType = {
  isShowCards: 'all',
  pageCount: initPageCount,
  min: minRangeValue,
  max: maxRangeValue,
  packName: '',
  user_id: '',
};

export const FilterReducer = (
  // eslint-disable-next-line default-param-last
  state: initialStateType = initialState,
  action: filterActionType,
): initialStateType => {
  switch (action.type) {
    case ActionTypeForFilter.changeIsShowCard:
      return { ...state, isShowCards: action.value };
    case ActionTypeForFilter.changePageCount:
      return { ...state, pageCount: action.value };
    case ActionTypeForFilter.changeFilter:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// action
export const changesShowCards = (value: isShowCardsType) =>
  ({ type: ActionTypeForFilter.changeIsShowCard, value } as const);
export const changePageCount = (value: number) =>
  ({ type: ActionTypeForFilter.changePageCount, value } as const);

export const changeFilter = (payload: PayloadType) =>
  ({ type: ActionTypeForFilter.changeFilter, payload } as const);
// thunk
export const changesShowCardsTC =
  (value: isShowCardsType, payload: ResCardsPacksType) =>
  async (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    try {
      const res = await cardsPacksAPI.getCardsPacks(payload);

      dispatch(getCardsPacksAC(res.data));
      dispatch(changeFilter(payload));
      dispatch(changesShowCards(value));
    } catch (err: any) {
      handleNetworkError(err, dispatch);
    } finally {
      dispatch(loading(false));
    }
  };

export const changeFilterPacksTC =
  (payload: ResCardsPacksType) => async (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    try {
      const res = await cardsPacksAPI.getCardsPacks(payload);

      dispatch(getCardsPacksAC(res.data));
      dispatch(changeFilter(payload));
    } catch (err: any) {
      handleNetworkError(err, dispatch);
    } finally {
      dispatch(loading(false));
    }
  };

export const createNewPackTC =
  (newPack: createCardsPackType, payload: ResCardsPacksType) =>
  async (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    try {
      await cardsPacksAPI.createCardsPack(newPack);
      dispatch(getCardsPacksTC(payload));
    } catch (err: any) {
      handleNetworkError(err, dispatch);
    } finally {
      dispatch(loading(false));
    }
  };

// type
export type changePageCountType = ReturnType<typeof changePageCount>;
export type changesShowCardsType = ReturnType<typeof changesShowCards>;
export type changeStateType = ReturnType<typeof changeFilter>;
export type filterActionType =
  | changeStateType
  | changePageCountType
  | changesShowCardsType;

export type isShowCardsType = 'my' | 'all';
type initialStateType = {
  isShowCards: isShowCardsType;
  pageCount: number;
  min: number;
  max: number;
  packName: string;
  user_id: string;
};

export type PayloadType = {
  isShowCards?: isShowCardsType;
  pageCount?: number;
  min?: number;
  max?: number;
  packName?: string;
};
