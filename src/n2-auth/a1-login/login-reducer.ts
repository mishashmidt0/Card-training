import { dataType, loginApi } from './loginApi';
import { TypedDispatch } from '../../n10-bll/redux';
import { handleNetworkLoginError, handleServerLogin } from './utils/handle-login-utils';

//enum
export enum loginReducerTitle {
  message = 'authorization was successful',
  messageError = 'some error',
  error = ' more details in the console',
}

enum Type {
  login = 'login',
}

//init && reducer
const initialState: loginStateType = {
  isAuth: false,
  isShowPassword: false,
};
export const loginReducer = (
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

export const isShowPassword = (value: boolean) =>
  ({
    type: Type.login,
    value,
  } as const);

// thunk
export const loginTC = (data: dataType) => (dispatch: TypedDispatch) => {
  loginApi
    .login(data)
    .then(res => {
      handleServerLogin(res.statusText, dispatch);
    })
    .catch(e => {
      handleNetworkLoginError(e, dispatch);
    });
};

// type
export type loginStateType = {
  isAuth: boolean;
  isShowPassword: boolean;
};
export type LoginActionsType = ReturnType<typeof login>;
