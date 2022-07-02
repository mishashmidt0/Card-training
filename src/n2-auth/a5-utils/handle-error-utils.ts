import { TypedDispatch } from '../../n10-bll/redux';
import { showAnswer, Status } from '../../n1-main/m0-App/app-reducer';
import { loginReducerTitle } from '../a1-login/login-reducer';
import { AxiosError } from 'axios';


export const handleNetworkError = (e: AxiosError<{ error: string }>, dispatch: TypedDispatch) => {
  const err = e.response ? e.response.data.error : e.message + loginReducerTitle.error;
  dispatch(showAnswer(err, Status.error));
};
