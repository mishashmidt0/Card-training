import React from 'react';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppRootStateType, useTypedDispatch } from '../../../n10-bll/redux';
import { ReturnComponentType } from '../../../n4-types';
import { logoutTC } from '../../m2-Profile/profile-reducer';
import { HeaderTitle } from '../Header';

export const ButtonAuthLinks = (): ReturnComponentType => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);
  const dispatch = useTypedDispatch();

  return isLoggedIn ? (
    <Button onClick={() => dispatch(logoutTC())} variant="text">
      <Link to="/login"> {HeaderTitle.logout}</Link>
    </Button>
  ) : (
    <>
      <Button variant="text">
        <Link to="/login">{HeaderTitle.login}</Link>
      </Button>
      <Button variant="text">
        <Link to="/register">{HeaderTitle.register}</Link>
      </Button>
    </>
  );
};
