import React from 'react';

import { Navigate } from 'react-router-dom';

import { ReturnComponentType } from '../../n4-types';
import { useAppSelector } from '../../n5-bll/redux';

import { RegisterForm } from './RegisterForm/RegisterForm';
import s from './RegisterStyle.module.css';

export const Register = (): ReturnComponentType => {
  const register = useAppSelector(state => state.register.isRegistered);

  if (register) return <Navigate to="/login" />;

  return (
    <div className={s.registerContainer}>
      <h1>Sing Up</h1>
      <RegisterForm />
    </div>
  );
};
