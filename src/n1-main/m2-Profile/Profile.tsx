import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import {AppRootStateType, useTypedDispatch} from "../../n10-bll/redux";
import {useSelector} from "react-redux";
import {initializeAppTC, logoutTC} from "./profile-reducer";
import {Button} from "@mui/material";



export const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth)
    const dispatch = useTypedDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        const thunk = initializeAppTC()
        dispatch(thunk)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

  return (
    <div>
        <Button onClick={() => dispatch(logoutTC())} color="inherit">Log out</Button>
        test
    </div>
  );
};
