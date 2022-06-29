import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRootStateType, useAppSelector, useTypedDispatch} from '../../n10-bll/redux';
import {useSelector} from 'react-redux';
import {changeProfileTC, initializeAppTC, logoutTC} from './profile-reducer';
import {Button} from '@mui/material';
import {ProfileInfo} from "./profileInfo";

export const Profile = () => {
    const profile = useAppSelector(state => state.profile)
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
        <div>
            <ProfileInfo value={profile.profile?.name} onChange={onProfileNameChangeHandler}/>
            <img src={profile.profile?.avatar}/>
            <div>{profile.profile?.email}</div>
            <div>{profile.profile?.name}</div>
            <div>{profile.profile?.publicCardPacksCount}</div>

            <Button onClick={() => dispatch(logoutTC())} color="inherit">
                Log out
            </Button>
            test
        </div>
    );
};
