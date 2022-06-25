import React, { FC } from 'react';
import s from '../loginStyle.module.css';

type ErrorMessageType = {
  message: string | undefined,
  blur: boolean | undefined
}
export const ErrorMessage: FC<ErrorMessageType> = ({ message, blur }) => {

  return <div className={`${s.errorMessage} ${!!message && blur ? s.errorMessageActive : ''}`}>{message}</div>;
};
