import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Login } from '../../../n2-auth/a1-login/Login';
import { Register } from '../../../n2-auth/a2-register/Register';
import { Forgot } from '../../../n2-auth/a3-forgot/Forgot';
import { NewPassword } from '../../../n2-auth/a3-forgot/NewPassword/NewPassword';
import { Error } from '../../../n3-error/Error';
import { ReturnComponentType } from '../../../n4-types';
import { GradeComponent } from '../../m1-PacksList/Cards/c4-GradeComponent/GradeComponent';
import { Cards } from '../../m1-PacksList/Cards/Cards';
import { LearnCards } from '../../m1-PacksList/LearnCards/LearnCards';
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
  cards = '/cards/:cardPackId',
  learn = '/learn/:cardPackName/:cardPackId',
  grade = '/grade/:cardPackName/:cardPackId/:cardId',
}

export const Navigate = (): ReturnComponentType => {
  return (
    <Routes>
      <Route path={PATH.main} element={<Profile />} />
      <Route path={PATH.profile} element={<Profile />} />
      <Route path={PATH.list} element={<PecksList />} />
      <Route path={PATH.login} element={<Login />} />
      <Route path={PATH.register} element={<Register />} />
      <Route path={PATH.forgot} element={<Forgot />} />
      <Route path={PATH.newPassword} element={<NewPassword />} />
      <Route path={PATH.error} element={<Error />} />
      <Route path={PATH.cards} element={<Cards />} />
      <Route path={PATH.grade} element={<GradeComponent />} />
      <Route path={PATH.learn} element={<LearnCards />} />
    </Routes>
  );
};
