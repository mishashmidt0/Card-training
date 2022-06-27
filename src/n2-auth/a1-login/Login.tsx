import React from 'react';
import s from './loginStyle.module.css';
import { LoginFormikComponent } from './l1-components/Login-Formik';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../n10-bll/redux';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);

  if (isLoggedIn) return <Navigate to="/profile" />;

  return (
    <div className={s.loginContainer}>
      <h1>Log in</h1>
      <LoginFormikComponent />
    </div>
  );
};
