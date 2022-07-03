import { AxiosError } from 'axios';

import { showAnswer, Status } from '../../n1-main/m0-App/app-reducer';
import { TypedDispatch } from '../../n5-bll/redux';
import { loginReducerTitle } from '../a1-login/login-reducer';

export const handleNetworkError = (
  e: AxiosError<{ error: string }>,
  dispatch: TypedDispatch,
): void => {
  const err = e.response ? e.response.data.error : e.message + loginReducerTitle.error;

  dispatch(showAnswer(err, Status.error));
};
