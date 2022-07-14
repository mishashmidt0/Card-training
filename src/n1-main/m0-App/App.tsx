import React, { useEffect } from 'react';

import { ReturnComponentType } from '../../n4-types';
import { useAppSelector, useTypedDispatch } from '../../n5-bll/redux';
import { getUserProfileTC } from '../m2-Profile/profile-reducer';
import { Header } from '../m3-header/Header';

import style from './AppStyle.module.css';
import { GlobalLoadingComponent } from './GlobalLoading/GlobalLoadingComponent';
import { Navigate } from './Navigate/Navigate';
import { Snackbars } from './Snackbar/Snackbar';

export const App = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.login.isAuth);
  const globalLoading = useAppSelector(state => state.app.globalLoading);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getUserProfileTC());
    }
  }, []);

  return !globalLoading ? (
    <GlobalLoadingComponent />
  ) : (
    <div className={style.App}>
      <Header />
      <Navigate />
      <Snackbars />
    </div>
  );
};
