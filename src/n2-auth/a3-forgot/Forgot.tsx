import React from 'react';

import { Navigate } from 'react-router-dom';

import { ReturnComponentType } from '../../n4-types';
import { useAppSelector } from '../../n5-bll/redux';

import { ForgotForm } from './ForgotForm/ForgotForm';
import s from './ForgotStyle.module.css';

export const Forgot = (): ReturnComponentType => {
  const isSendMessageToEmail = useAppSelector(state => state.forgot.isSendMessageToEmail);

  if (isSendMessageToEmail) return <Navigate to="/login" />;

  return (
    <div className={s.forgotContainer}>
      <h1>Forgot your password?</h1>
      <ForgotForm />
    </div>
  );
};
