import { loading, showAnswer, Status } from '../../n1-main/m0-App/app-reducer';
import { TypedDispatch } from '../../n5-bll/redux';
import { handleNetworkError } from '../a4-utils/handle-error-utils';

import { registerApi, RegisterParamsType } from './registerApi';

// enum
enum registerTypes {
  setIsRegistered = 'register/SET-IS-REGISTERED',
}

// reducer
const initialState = { isRegistered: false };

export const registerReducer = (
  // eslint-disable-next-line default-param-last
  state: InitialStateType = initialState,
  action: RegisterActionsType,
): InitialStateType => {
  switch (action.type) {
    case registerTypes.setIsRegistered:
      return { ...state, isRegistered: action.value };
    default:
      return state;
  }
};

// actions
export const setIsRegisteredAC = (value: boolean) =>
  ({ type: registerTypes.setIsRegistered, value } as const);
// thunks
export const registerTC =
  (data: RegisterParamsType) => async (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    try {
      await registerApi.registerUser(data);
      dispatch(setIsRegisteredAC(true));
      dispatch(showAnswer('You have been successfully registered', Status.success));
    } catch (error: any) {
      handleNetworkError(error, dispatch);
    } finally {
      dispatch(loading(false));
    }
  };
// n4-types
export type RegisterActionsType = ReturnType<typeof setIsRegisteredAC>;
type InitialStateType = typeof initialState;
