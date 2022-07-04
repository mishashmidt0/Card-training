import React from 'react';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { ReturnComponentType } from '../../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../../n5-bll/redux';
import { logoutTC } from '../../m2-Profile/profile-reducer';
import { HeaderTitle } from '../Header';

export const ButtonAuthLinks = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.login.isAuth);

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
