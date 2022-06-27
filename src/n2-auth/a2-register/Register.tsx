import React from 'react';
import s from './registerStyle.module.css';
import { useAppSelector } from '../../n10-bll/redux';
import { Navigate } from 'react-router-dom';
import { RegisterForm } from './RegisterForm';

export const Register = () => {
  const register = useAppSelector(state => state.register.isRegistered);

  if (register) return <Navigate to="/login" />;
  return (
    <div className={s.registerContainer}>
      <h1>Sing Up</h1>
      <RegisterForm />
    </div>
  );
};
