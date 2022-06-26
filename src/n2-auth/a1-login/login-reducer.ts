import { Dispatch } from 'redux';
import { dataType, loginApi } from './loginApi';

const initialState = {
  isAuth: false,
};

enum Type {
  login = 'login',
}

export const loginReducer = (
  state: loginStateType = initialState,
  action: actionType,
) => {
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

export const loginTC = (data: dataType) => (dispatch: Dispatch<any>) => {
  loginApi.login(data).then(res => {
    try {
      console.log(res);

      dispatch(login(true));
    } catch (e: any) {
      const err = e.responce
        ? e.responce.data.error
        : e.message + 'more details in the console';
      console.log(err);
    }
  });
};

// type
export type loginStateType = {
  isAuth: boolean;
};
type actionType = ReturnType<typeof login>;
