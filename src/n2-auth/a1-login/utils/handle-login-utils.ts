import { TypedDispatch } from '../../../n10-bll/redux';
import { showAnswer, Status } from '../../../n1-main/app-reducer';
import { login, loginReducerTitle } from '../login-reducer';

export const handleServerLogin = (status: string, dispatch: TypedDispatch) => {
  if (status === 'OK') {
    dispatch(login(true));
    dispatch(showAnswer(loginReducerTitle.message, Status.success));
  } else {
    dispatch(showAnswer(loginReducerTitle.messageError, Status.error));
  }
};

export const handleNetworkLoginError = (e: any, dispatch: TypedDispatch) => {
  const err = e.response ? e.response.data.error : e.message + loginReducerTitle.error;
  dispatch(showAnswer(err, Status.error));
};
