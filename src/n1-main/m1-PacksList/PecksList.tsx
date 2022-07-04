import React from 'react';

import { Navigate } from 'react-router-dom';

import { ReturnComponentType } from '../../n4-types';
import { useAppSelector } from '../../n5-bll/redux';

import { CardsPacks } from './CardsPacks/CardsPacks';
import s from './PecksList.module.css';

export const PecksList = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(state => state.login.isAuth);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <div className={s.packListContainer}>
      <CardsPacks />
    </div>
  );
};
