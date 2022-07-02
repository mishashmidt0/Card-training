import React, { useEffect } from 'react';
import { Header } from '../m3-header/Header';
import s from './appStyle.module.css';
import { Snackbars } from './Snackbar/Snackbar';
import { getUserProfileTC } from '../m2-Profile/profile-reducer';
import { useAppSelector, useTypedDispatch } from '../../n10-bll/redux';
import { GlobalLoadingComponent } from './GlobalLoading/GlobalLoadingComponent';
import { Navigate } from './Navigate';

export const App = () => {
  
  const isLoggedIn = useAppSelector(state => state.login.isAuth);
  const globalLoading = useAppSelector(state => state.app.globalLoading);
  
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!isLoggedIn) dispatch(getUserProfileTC());
  }, [dispatch, isLoggedIn]);

  return !globalLoading ? (
    <GlobalLoadingComponent />
  ) : (
      <div className={s.App}>
        <Header />
        <Navigate />
        <Snackbars />
      </div>
  );
};
