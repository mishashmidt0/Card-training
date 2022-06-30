import { TypedDispatch } from '../../../n10-bll/redux';
import { showAnswer, Status } from '../../../n1-main/app-reducer';
import { login, loginReducerTitle } from '../login-reducer';
import { getProfileAC } from '../../../n1-main/m2-Profile/profile-reducer';

export const handleServerLogin = (res: any, dispatch: TypedDispatch) => {
  if (res.statusText === 'OK') {
    dispatch(login(true));
    dispatch(showAnswer(loginReducerTitle.message, Status.success));
    dispatch(getProfileAC(res.data));
  } else {
    dispatch(showAnswer(loginReducerTitle.messageError, Status.error));
  }
};

export const handleNetworkLoginError = (e: any, dispatch: TypedDispatch) => {
  const err = e.response ? e.response.data.error : e.message + loginReducerTitle.error;
  dispatch(showAnswer(err, Status.error));
};
