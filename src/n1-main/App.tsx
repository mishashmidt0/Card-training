import React from 'react';
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

export const App = () => {
  return (
    <BrowserRouter>
      <div className={s.App}>
        <Header />
        <Routes>
          <Route path={'/'} element={<Profile />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'/list'} element={<PecksList />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/forgot'} element={<Forgot />} />
          <Route path={'/set-new-password'} element={<NewPassword />} />
          <Route path={'/*'} element={<Error />} />
        </Routes>
        <Snackbars />
      </div>
    </BrowserRouter>
  );
};
