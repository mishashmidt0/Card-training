import { dataType, loginApi } from './loginApi';
import { TypedDispatch } from '../../n10-bll/redux';
import { Cover, showAnswer, Value } from '../../n1-main/app-reducer';

const initialState = {
  isAuth: false,
};

enum Title {
  message = 'authorization was successful',
  error = 'more details in the console',
}

enum Type {
  login = 'login',
}

export const loginReducer = (
  state: loginStateType = initialState, action: LoginActionsType): loginStateType => {
  switch (action.type) {
    case Type.login:
      return { ...state, isAuth: action.value };
    default:
      return state;
  }
};

// action
const login = (value: boolean) =>
  ({
    type: Type.login,
    value,
  } as const);

// thunk

export const loginTC = (data: dataType) => (dispatch: TypedDispatch) => {
  loginApi.login(data).then(res => {
    try {
      console.log(res);

      dispatch(login(res.data.value));
      dispatch(showAnswer(Value.show, Title.message, Cover.success));
    } catch (e: any) {
      const err = e.responce
        ? e.responce.data.error
        : e.message + Title.error;
      console.log(err);
    }
  });
};


// type
export type loginStateType = {
  isAuth: boolean;
};
export type LoginActionsType = ReturnType<typeof login>;
