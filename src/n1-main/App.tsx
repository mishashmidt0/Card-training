import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './m3-header/Header';
import s from './appStyle.module.css';
import { Snackbars } from './m4-components/Snackbar/Snackbar';
import { getUserProfileTC } from './m2-Profile/profile-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType, useTypedDispatch } from '../n10-bll/redux';
import { GlobalLoadingComponent } from './m4-components/GlobalLoading/GlobalLoadingComponent';
import { Navigate } from './m4-components/Navigate';

export const App = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);
  const GlobalLoading = useSelector<AppRootStateType, boolean>(
    state => state.app.globalLoading,
  );
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!isLoggedIn) dispatch(getUserProfileTC());
  }, []);

  return !GlobalLoading ? (
    <GlobalLoadingComponent />
  ) : (
    <BrowserRouter>
      <div className={s.App}>
        <Header />
        <Navigate />
        <Snackbars />
      </div>
    </BrowserRouter>
  );
};
