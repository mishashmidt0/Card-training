import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRootStateType, useAppSelector, useTypedDispatch} from '../../n10-bll/redux';
import {useSelector} from 'react-redux';
import {changeProfileTC, initializeAppTC, logoutTC, ProfileStateType} from './profile-reducer';
import {Button} from '@mui/material';
import {ProfileInfo} from "./profileInfo";
import s from "./ProfileStyle.module.css";

export const Profile = () => {
    const profile = useAppSelector(state => state.profile.profile) as ProfileStateType
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isAuth);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        const thunk = initializeAppTC();
        dispatch(thunk);
    }, []);


    const onProfileNameChangeHandler = (newValue: string | undefined) => {
        dispatch(changeProfileTC({name: newValue}))
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className={s.profileContainer}>
            <ProfileInfo value={profile.name} onChange={onProfileNameChangeHandler}/>
            <div>email {profile.email}</div>
            <div>name {profile.name}</div>
            <div>count {profile.publicCardPacksCount}</div>

            <Button onClick={() => dispatch(logoutTC())} color="inherit">
                Log out
            </Button>
            test
        </div>
    );
};
