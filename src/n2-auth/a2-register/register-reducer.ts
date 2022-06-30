import { registerApi, RegisterParamsType } from './registerApi';
import { loading, showAnswer, Status } from '../../n1-main/app-reducer';
import { TypedDispatch } from '../../n10-bll/redux';

enum registerTypes {
  setIsRegistered = 'register/SET-IS-REGISTERED',
}

const initialState = { isRegistered: false };
type InitialStateType = typeof initialState;

export const registerReducer = (
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
export const registerTC = (data: RegisterParamsType) => (dispatch: TypedDispatch) => {
  dispatch(loading(true));
  registerApi
    .registerUser(data)
    .then(() => {
      dispatch(setIsRegisteredAC(true));
      dispatch(showAnswer('You have been successfully registered', Status.success));
    })
    .catch(error => {
      dispatch(setIsRegisteredAC(false));
      dispatch(
        showAnswer(
          error.response.data.error +
            " If you don't remember your password go to 'forgot'",
          Status.error,
        ),
      );
    })
    .finally(() => {
      dispatch(loading(false));
    });
};
// types
export type RegisterActionsType = ReturnType<typeof setIsRegisteredAC>;
