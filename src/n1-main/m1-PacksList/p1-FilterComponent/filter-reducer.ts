// enum
import { handleNetworkError } from '../../../n2-auth/a4-utils/handle-error-utils';
import { TypedDispatch } from '../../../n5-bll/redux';
import { loading } from '../../m0-App/app-reducer';
import { getCardsPacksAC } from '../CardsPacks/cardsPacks-reducer';
import { cardsPacksAPI, ResCardsPacksType } from '../CardsPacks/cardsPacksAPI';

enum ActionType {
  changeIsShowCard = 'FilterReducer/ChangeIsShowCard',
  changePageCount = 'FilterReducer/ChangePageCount',
  changeFilter = 'FilterReducer/changeFilter',
}

export const startRange = 0;
export const endRange = 20;
export const initPageCount = 10;
// reducer
const initialState: initialStateType = {
  isShowCards: 'all',
  pageCount: initPageCount,
  min: startRange,
  max: endRange,
  packName: '',
};

export const FilterReducer = (
  // eslint-disable-next-line default-param-last
  state: initialStateType = initialState,
  action: filterActionType,
): initialStateType => {
  switch (action.type) {
    case ActionType.changeIsShowCard:
      return { ...state, isShowCards: action.value };
    case ActionType.changePageCount:
      return { ...state, pageCount: action.value };
    case ActionType.changeFilter:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// action
export const changesShowCards = (value: isShowCardsType) =>
  ({ type: ActionType.changeIsShowCard, value } as const);
export const changePageCount = (value: number) =>
  ({ type: ActionType.changePageCount, value } as const);

export const changeFilter = (payload: PayloadType) =>
  ({ type: ActionType.changeFilter, payload } as const);
// thunk
export const changesShowCardsTC =
  (value: isShowCardsType, payload: ResCardsPacksType) =>
  async (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    try {
      const res = await cardsPacksAPI.getCardsPacks(payload);

      dispatch(getCardsPacksAC(res.data));
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
};

export type PayloadType = {
  isShowCards?: isShowCardsType;
  pageCount?: number;
  min?: number;
  max?: number;
  packName?: string;
};
