import React, { FC } from 'react';
import s from '../LoginStyle.module.css';

type ErrorMessageType = {
  message: string | undefined;
  isActive: boolean;
};
export const ErrorMessage: FC<ErrorMessageType> = React.memo(({ message, isActive }) => {
  return (
    <div className={`${s.errorMessage} ${!!message ? s.errorMessageActive : ''}`}>
      {isActive && message}
    </div>
  );
});
