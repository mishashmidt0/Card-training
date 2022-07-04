import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import ava from '../../assets/images/defaultAva.jpg';
import { ReturnComponentType } from '../../n4-types';
import { AppRootStateType, useAppSelector, useTypedDispatch } from '../../n5-bll/redux';

import { changeProfileTC, ProfileStateType } from './profile-reducer';
import { ProfileInfo } from './ProfileInfo';
import s from './ProfileStyle.module.css';

export const Profile = (): ReturnComponentType => {
  const profile = useAppSelector(state => state.profile.profile) as ProfileStateType;
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);
  const dispatch = useTypedDispatch();

  const onProfileNameChangeHandler = (newValue: string): void => {
    dispatch(changeProfileTC({ name: newValue }));
  };

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <div className={s.profileContainer}>
      <div className={s.avatarContainer}>
        <img src={ava} alt="ava" />
      </div>
      <div className={s.description}>
        <ProfileInfo value={profile.name} onChange={onProfileNameChangeHandler} />
        <div>Email: {profile.email}</div>
        <div>Count of packs: {profile.publicCardPacksCount}</div>
      </div>
    </div>
  );
};
