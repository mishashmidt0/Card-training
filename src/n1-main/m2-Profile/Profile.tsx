import React from 'react';
import {Navigate} from 'react-router-dom';
import {AppRootStateType, useAppSelector, useTypedDispatch} from '../../n10-bll/redux';
import {useSelector} from 'react-redux';
import {changeProfileTC, logoutTC, ProfileStateType} from './profile-reducer';
import {Button} from '@mui/material';
import {ProfileInfo} from './profileInfo';
import s from './ProfileStyle.module.css';
import ava from "../../assets/images/defaultAva.jpg"

export const Profile = () => {
    const profile = useAppSelector(state => state.profile.profile) as ProfileStateType;
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);
    const dispatch = useTypedDispatch();

    const onProfileNameChangeHandler = (newValue: string | undefined) => {
        dispatch(changeProfileTC({name: newValue}));
    };

    if (!isLoggedIn) return <Navigate to='/login'/>;

    return (
        <div className={s.profileContainer}>
            <div className={s.avatarContainer}>
                <img src={ava} alt="ava"/>
            </div>
            <div className={s.description}>
                <ProfileInfo value={profile.name} onChange={onProfileNameChangeHandler}/>
                <div>Email: {profile.email}</div>
                <div>Count of packs: {profile.publicCardPacksCount}</div>

            </div>

        </div>
    );
};
