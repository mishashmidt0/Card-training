import { TypedDispatch } from '../../../n10-bll/redux';
import { showAnswer, Status } from '../../../n1-main/app-reducer';
import { ResponseNewPassword } from '../../a3-forgot/forgotApi';
import { changeIsCreate, newPassTitle } from '../newPassword-reducer';

export const handleServerNewPass = (
  res: ResponseNewPassword,
  dispatch: TypedDispatch,
) => {
  if (!!res.info) {
    dispatch(changeIsCreate(true));
    dispatch(showAnswer(newPassTitle.create, Status.success));
  } else {
    dispatch(showAnswer(newPassTitle.err, Status.error));
  }
};

export const handleNetworkNewPassError = (e: any, dispatch: TypedDispatch) => {
  const err = e.response ? e.response.data.error : e.message + newPassTitle.err;
  dispatch(showAnswer(err, Status.error));
};
