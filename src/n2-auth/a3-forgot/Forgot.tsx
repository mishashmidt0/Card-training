import React from 'react';
import s from './forgotStyle.module.css';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../n10-bll/redux';
import { Navigate } from 'react-router-dom';
import { ForgotForm } from './ForgotForm';

export const Forgot = () => {
  const isSendMessageToEmail = useSelector<AppRootStateType>(
    state => state.forgot.isSendMessageToEmail,
  );

  if (isSendMessageToEmail) return <Navigate to="/login" />;
  return (
    <div className={s.forgotContainer}>
      <h1>Forgot your password?</h1>
      <ForgotForm />
    </div>
  );
};
