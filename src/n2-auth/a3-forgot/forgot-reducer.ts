import { TypedDispatch } from '../../n10-bll/redux';
import { forgotApi } from './forgotApi';
import { loading, showAnswer, Status } from '../../n1-main/app-reducer';
import { changeIsCreate } from '../a4-newPassword/newPassword-reducer';

// enum
enum forgotTypes {
  setIsSendMessage = 'forgot/SET-IS-SEND-MESSAGE',
}

// reducer
const initialState = {
  isSendMessageToEmail: false,
};
export const forgotReducer = (
  state: InitialStateType = initialState,
  action: ForgotPasswordActionsType,
): InitialStateType => {
  switch (action.type) {
    case forgotTypes.setIsSendMessage:
      return { ...state, isSendMessageToEmail: action.value };
    default:
      return state;
  }
};

// actions
export const setIsForgotPasswordAC = (value: boolean) =>
  ({ type: forgotTypes.setIsSendMessage, value } as const);

// thunks
export const forgotPasswordTC = (email: string) => (dispatch: TypedDispatch) => {
  dispatch(loading(true));
  forgotApi
    .forgotPassword(email)
    .then(() => {
      dispatch(setIsForgotPasswordAC(true));
      dispatch(showAnswer(`Check email: ${email}`, Status.success));
      dispatch(changeIsCreate(false));
    })
    .catch(error => {
      dispatch(setIsForgotPasswordAC(false));
      dispatch(showAnswer(error.response.data.error, Status.error));
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

// types
export type ForgotPasswordActionsType = ReturnType<typeof setIsForgotPasswordAC>;
type InitialStateType = typeof initialState;
