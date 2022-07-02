import { loading, showAnswer, Status } from '../../n1-main/m0-App/app-reducer';
import { TypedDispatch } from '../../n10-bll/redux';
import { forgotApi, newPasswordType } from '../a3-forgot/forgotApi';
import { handleNetworkError } from '../a5-utils/handle-error-utils';

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
  // eslint-disable-next-line default-param-last
  state: createNewPasswordActionType = initialState,
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
      if (res.data.info) {
        dispatch(changeIsCreate(true));
        dispatch(showAnswer(newPassTitle.create, Status.success));
      } else {
        dispatch(showAnswer(newPassTitle.err, Status.error));
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
type createNewPasswordActionType = {
  isCreate: boolean;
};
export type ActionCreateNewPass = ReturnType<typeof changeIsCreate>;
