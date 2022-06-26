import {Dispatch} from 'redux';
import {profileApi, ProfileDataType} from "./profileApi";
import {login} from "../../n2-auth/a1-login/login-reducer";

const initialState: ProfileStateType = {}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {
        case 'PROFILE/GET-PROFILE':
            return {...action.profile};
        default:
            return state;
    }
};

// actions

export const getProfileAC = (profile: ProfileStateType) => ({
    type: 'PROFILE/GET-PROFILE', profile
}) as const


// thunk

export const initializeAppTC = () => (dispatch: Dispatch) => {
    profileApi.me()
        .then(res => {
            dispatch(getProfileAC(res))
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    profileApi.logout()
        .then(res => {
                dispatch(login(false))
        })
}

export const changeProfileTC = (data:ProfileDataType) => (dispatch: Dispatch<ActionsType>) => {
    profileApi.changeProfile(data)
        .then(res => {
            dispatch(getProfileAC(res))
        })
}

// type
export type ProfileStateType = {
        _id: string | null
        email: string | null
        name: string | null
        avatar?: string | null
        publicCardPacksCount: number | null
        created: string;
        updated: string;
        isAdmin: boolean;
        verified: boolean; // подтвердил ли почту
        rememberMe: boolean;
        error?: string;
    }
    | {}

type ActionsType = GetProfileActionType | ReturnType<typeof login>

type GetProfileActionType = ReturnType<typeof getProfileAC>

