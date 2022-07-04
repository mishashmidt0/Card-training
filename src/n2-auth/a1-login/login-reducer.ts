import { loading, showAnswer, Status } from '../../n1-main/m0-App/app-reducer';
import { getProfileAC } from '../../n1-main/m2-Profile/profile-reducer';
import { TypedDispatch } from '../../n5-bll/redux';
import { handleNetworkError } from '../a4-utils/handle-error-utils';

import { dataType, loginApi } from './loginApi';

// enum
export enum loginReducerTitle {
  message = 'authorization was successful',
  messageError = 'some error',
  error = ' more details in the console',
}

enum Type {
  login = 'LOGIN/LOGIN',
}

// init && reducer
const initialState: loginStateType = {
  isAuth: false,
};

export const loginReducer = (
  // eslint-disable-next-line default-param-last
  state: loginStateType = initialState,
  action: LoginActionsType,
): loginStateType => {
  switch (action.type) {
    case Type.login:
      return { ...state, isAuth: action.value };
    default:
      return state;
  }
};

// action
export const login = (value: boolean) =>
  ({
    type: Type.login,
    value,
  } as const);

// thunk
export const loginTC = (data: dataType) => (dispatch: TypedDispatch) => {
  dispatch(loading(true));
  loginApi
    .login(data)
    .then(res => {
      if (res.statusText === 'OK') {
        dispatch(login(true));
        dispatch(showAnswer(loginReducerTitle.message, Status.success));
        dispatch(getProfileAC(res.data));
      } else {
        dispatch(showAnswer(loginReducerTitle.messageError, Status.error));
      }
    })
    .catch(e => {
      handleNetworkError(e, dispatch);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

// type
export type loginStateType = {
  isAuth: boolean;
};
export type LoginActionsType = ReturnType<typeof login>;
