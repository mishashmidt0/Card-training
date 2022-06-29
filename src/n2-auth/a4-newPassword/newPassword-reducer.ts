import { forgotApi, newPasswordType } from '../a3-forgot/forgotApi';
import { TypedDispatch } from '../../n10-bll/redux';
import { loading } from '../../n1-main/app-reducer';
import {
  handleNetworkNewPassError,
  handleServerNewPass,
} from './utils/handle-newPass-utils';

// enum
export enum newPassTitle {
  create = 'created new password!',
  err = 'somebody problem',
}

enum ActionType {
  newPass = 'NEWPASS/CREATE-NEW-PASS',
}

// init && reducer
const initialState: createNewPasswordActionType = {
  isCreate: false,
};
export const newPasswordReducer = (
  state = initialState,
  action: ActionCreateNewPass,
): createNewPasswordActionType => {
  switch (action.type) {
    case ActionType.newPass:
      return { ...state, isCreate: action.value };
    default:
      return state;
  }
};
// action
export const changeIsCreate = (value: boolean) =>
  ({ type: ActionType.newPass, value } as const);

// thunk
export const createNewPassword = (data: newPasswordType) => (dispatch: TypedDispatch) => {
  dispatch(loading(true));
  forgotApi
    .createNewPassword(data)
    .then(res => {
      handleServerNewPass(res, dispatch);
    })
    .catch(e => {
      handleNetworkNewPassError(e, dispatch);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

// type
type createNewPasswordActionType = {
  isCreate: boolean;
};
export type ActionCreateNewPass = ReturnType<typeof changeIsCreate>;
