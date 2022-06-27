import React from 'react';
import s from './ForgotStyle.module.css';
import { useAppSelector } from '../../n10-bll/redux';
import { Navigate } from 'react-router-dom';
import { ForgotForm } from './ForgotForm/ForgotForm';

export const Forgot = () => {
  const isSendMessageToEmail = useAppSelector(state => state.forgot.isSendMessageToEmail);

  if (isSendMessageToEmail) return <Navigate to="/login" />;
  return (
    <div className={s.forgotContainer}>
      <h1>Forgot your password?</h1>
      <ForgotForm />
    </div>
  );
};
