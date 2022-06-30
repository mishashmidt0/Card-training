import React from 'react';
import { Button } from '@mui/material';
import { logoutTC } from '../../m2-Profile/profile-reducer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRootStateType, useTypedDispatch } from '../../../n10-bll/redux';
import { HeaderTitle } from './SearchAppBar';

export const ButtonLogLink = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);
  const dispatch = useTypedDispatch();

  return isLoggedIn ? (
    <Button onClick={() => dispatch(logoutTC())} variant="text">
      <Link to={'/login'}> {HeaderTitle.logout}</Link>
    </Button>
  ) : (
    <>
      <Button variant="text">
        <Link to={'/login'}>{HeaderTitle.login}</Link>
      </Button>
      <Button variant="text">
        <Link to={'/register'}>{HeaderTitle.register}</Link>
      </Button>
    </>
  );
};
