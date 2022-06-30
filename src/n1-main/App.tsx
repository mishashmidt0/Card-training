import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../n2-auth/a1-login/Login';
import { Register } from '../n2-auth/a2-register/Register';
import { Forgot } from '../n2-auth/a3-forgot/Forgot';
import { Error } from '../n3-error/Error';
import { Profile } from './m2-Profile/Profile';
import { PecksList } from './m1-PacksList/PecksList';
import { Header } from './m3-header/Header';
import s from './appStyle.module.css';
import { Snackbars } from './m4-components/Snackbar/Snackbar';
import { NewPassword } from '../n2-auth/a4-newPassword/NewPassword';
import { getUserProfileTC } from './m2-Profile/profile-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType, useTypedDispatch } from '../n10-bll/redux';
import { CircularProgress } from '@mui/material';

export const App = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);
  const GlobalLoading = useSelector<AppRootStateType, boolean>(state => state.app.globalLoading);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getUserProfileTC());
    }
  }, []);

  if (!GlobalLoading) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress color={'inherit'} size={150}/>
    </div>
  }

  return (
    <BrowserRouter>
      <div className={s.App}>
        <Header />
        <Routes>
          <Route path={'/'} element={<Profile />} />
          <Route path={'/Card-training'} element={<Profile />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'/list'} element={<PecksList />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/forgot'} element={<Forgot />} />
          <Route path={'/set-new-password/:token'} element={<NewPassword />} />
          <Route path={'/*'} element={<Error />} />
        </Routes>
        <Snackbars />
      </div>
    </BrowserRouter>
  );
};
