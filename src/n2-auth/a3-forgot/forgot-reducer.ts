import { loading, showAnswer, Status } from '../../n1-main/m0-App/app-reducer';
import { TypedDispatch } from '../../n5-bll/redux';
import { handleNetworkError } from '../a4-utils/handle-error-utils';

import { forgotApi, newPasswordType } from './forgotApi';

// enum
enum forgotTypes {
  setIsSendMessage = 'FORGOT/SET-IS-SEND-MESSAGE',
  newPass = 'FORGOT/CREATE-NEW-PASS',
}

// reducer
const initialState = {
  isSendMessageToEmail: false,
  isCreate: false,
};

export const forgotReducer = (
  // eslint-disable-next-line default-param-last
  state: InitialStateType = initialState,
  action: ForgotPasswordActionsType,
): InitialStateType => {
  switch (action.type) {
    case forgotTypes.setIsSendMessage:
      return { ...state, isSendMessageToEmail: action.value };
    case forgotTypes.newPass:
      return { ...state, isCreate: action.value };
    default:
      return state;
  }
};

// actions
export const setIsForgotPasswordAC = (value: boolean) =>
  ({ type: forgotTypes.setIsSendMessage, value } as const);

export const changeIsCreate = (value: boolean) =>
  ({ type: forgotTypes.newPass, value } as const);

// thunks
export const sendMessageForMailTC =
  (email: string) => async (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    try {
      await forgotApi.forgotPassword(email);
      dispatch(setIsForgotPasswordAC(true));
      dispatch(showAnswer(`Check email: ${email}`, Status.success));
      dispatch(changeIsCreate(false));
    } catch (error: any) {
      handleNetworkError(error, dispatch);
    } finally {
      dispatch(loading(false));
    }
  };

export const createNewPassword =
  (data: newPasswordType) => async (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    try {
      await forgotApi.createNewPassword(data);
      dispatch(changeIsCreate(true));
      dispatch(showAnswer('created new password!', Status.success));
    } catch (error: any) {
      handleNetworkError(error, dispatch);
    } finally {
      dispatch(loading(false));
    }
  };

// n3-types
export type SetIsForgotPasswordActionsType = ReturnType<typeof setIsForgotPasswordAC>;
export type CreateNewPasswordActionsType = ReturnType<typeof changeIsCreate>;

export type ForgotPasswordActionsType =
  | SetIsForgotPasswordActionsType
  | CreateNewPasswordActionsType;

type InitialStateType = typeof initialState;
