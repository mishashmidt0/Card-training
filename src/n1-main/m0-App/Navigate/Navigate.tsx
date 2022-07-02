import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Login } from '../../../n2-auth/a1-login/Login';
import { Register } from '../../../n2-auth/a2-register/Register';
import { Forgot } from '../../../n2-auth/a3-forgot/Forgot';
import { NewPassword } from '../../../n2-auth/a4-newPassword/NewPassword';
import { Error } from '../../../n3-error/Error';
import { ReturnComponentType } from '../../../n4-types';
import { PecksList } from '../../m1-PacksList/PecksList';
import { Profile } from '../../m2-Profile/Profile';

enum PATH {
  main = '/',
  profile = '/profile',
  list = '/list',
  login = '/login',
  register = '/register',
  forgot = '/forgot',
  newPassword = '/set-new-password/:token',
  error = '/*',
}

const routes = [
  { id: uuidv4(), path: PATH.main, component: <Profile /> },
  { id: uuidv4(), path: PATH.profile, component: <Profile /> },
  { id: uuidv4(), path: PATH.list, component: <PecksList /> },
  { id: uuidv4(), path: PATH.login, component: <Login /> },
  { id: uuidv4(), path: PATH.register, component: <Register /> },
  { id: uuidv4(), path: PATH.forgot, component: <Forgot /> },
  { id: uuidv4(), path: PATH.newPassword, component: <NewPassword /> },
  { id: uuidv4(), path: PATH.error, component: <Error /> },
];

export const Navigate = (): ReturnComponentType => {
  return (
    <Routes>
      {routes.map(route => (
        <Route key={route.id} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};
