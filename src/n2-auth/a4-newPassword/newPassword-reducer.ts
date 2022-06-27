import { forgotApi, newPasswordType } from '../a3-forgot/forgotApi';
import { TypedDispatch } from '../../n10-bll/redux';
import { loading } from '../../n1-main/app-reducer';
import { handleNetworkNewPassError, handleServerNewPass } from './utils/handle-newPass-utils';

//enum
export enum newPassTitle {
  create = 'created new password!',
  err = 'somebody problem',

}

// init && reducer
const initialState = {};
export const newPasswordReducer = (
  state = initialState,
  action: {}) => {
};

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

