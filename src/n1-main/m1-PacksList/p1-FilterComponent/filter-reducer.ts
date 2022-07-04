// enum
import { handleNetworkError } from '../../../n2-auth/a4-utils/handle-error-utils';
import { TypedDispatch } from '../../../n5-bll/redux';
import { loading } from '../../m0-App/app-reducer';
import { getCardsPacksAC } from '../CardsPacks/cardsPacks-reducer';
import { cardsPacksAPI, ResCardsPacksType } from '../CardsPacks/cardsPacksAPI';

enum ActionType {
  changeIsShowCard = 'FilterReducer/ChangeIsShowCard',
}

// reducer
const initialState: initialStateType = {
  isShowCards: 'all',
};

export const FilterReducer = (
  // eslint-disable-next-line default-param-last
  state: initialStateType = initialState,
  action: filterActionType,
): initialStateType => {
  switch (action.type) {
    case ActionType.changeIsShowCard:
      return { ...state, isShowCards: action.value };

    default:
      return state;
  }
};

// action
export const changesShowCards = (value: isShowCardsType) =>
  ({ type: ActionType.changeIsShowCard, value } as const);

// thunk
export const changesShowCardsTC =
  (value: isShowCardsType, payload: ResCardsPacksType) =>
  async (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    try {
      const res = await cardsPacksAPI.getFiltersCardsPacks(payload);

      dispatch(getCardsPacksAC(res.data));
      dispatch(changesShowCards(value));
    } catch (err: any) {
      handleNetworkError(err, dispatch);
    } finally {
      dispatch(loading(false));
    }
  };

// type
export type filterActionType = ReturnType<typeof changesShowCards>;

type isShowCardsType = 'my' | 'all';
type initialStateType = {
  isShowCards: isShowCardsType;
};
