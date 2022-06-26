import React, { FC } from 'react';
import s from '../loginStyle.module.css';

type ErrorMessageType = {
  message: string | undefined;
};
export const ErrorMessage: FC<ErrorMessageType> = ({ message }) => {
  return (
    <div className={`${s.errorMessage} ${!!message ? s.errorMessageActive : ''}`}>
      {message}
    </div>
  );
};
