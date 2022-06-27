import React from 'react';
import s from './newPasswordStyle.module.css';
import { NewPasswordFormikComponent } from './n1-components/newPasswordFormik';
import { useAppSelector } from '../../n10-bll/redux';
import { Navigate } from 'react-router-dom';

export const NewPassword = () => {
  const isCreate = useAppSelector(state => state.createPass.isCreate);

  if (isCreate) return <Navigate to="/login" />;
  return (
    <div className={s.newPasswordContainer}>
      <h1>Create new password</h1>
      <NewPasswordFormikComponent />
    </div>
  );
};
