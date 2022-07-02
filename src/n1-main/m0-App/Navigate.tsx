import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Profile } from '../m2-Profile/Profile';
import { PecksList } from '../m1-PacksList/PecksList';
import { Login } from '../../n2-auth/a1-login/Login';
import { Register } from '../../n2-auth/a2-register/Register';
import { Forgot } from '../../n2-auth/a3-forgot/Forgot';
import { NewPassword } from '../../n2-auth/a4-newPassword/NewPassword';
import { Error } from '../../n3-error/Error';

export const Navigate = () => {
  return (
    <>
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
    </>
  );
};
