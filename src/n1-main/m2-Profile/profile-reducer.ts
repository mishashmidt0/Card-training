import {profileApi, ProfileDataType} from './profileApi';
import {login} from '../../n2-auth/a1-login/login-reducer';
import {TypedDispatch} from '../../n10-bll/redux';
import {closeAnswerType, loading, loadingType, showAnswer, showAnswerType, Status} from "../app-reducer";
import {setIsRegisteredAC} from "../../n2-auth/a2-register/register-reducer";

//enum
enum ActionType {
    getProfile = 'PROFILE/GET-PROFILE',
    changeProfileName = 'PROFILE/CHANGE-PROFILE-NAME',
}


type InitialStateType = {
    profile: {} | ProfileStateType
}

const initialState: InitialStateType = {
    profile: {},
};

export const profileReducer = (
    state: InitialStateType = initialState,
    action: ProfileActionsType,
): InitialStateType => {
    switch (action.type) {
        case ActionType.getProfile:
            return {...state, profile: action.profile};
        case ActionType.changeProfileName:
            return {...state, profile: {...state.profile, name: action.newName}};
        default:
            return state;
    }
};

// actions

export const getProfileAC = (profile: ProfileStateType) =>
    ({
        type: ActionType.getProfile,
        profile,
    } as const);

export const changeProfileNameAC = (newName: string) =>
    ({
        type: ActionType.changeProfileName,
        newName,
    } as const);

// thunk
export const getUserProfileTC = () => (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    profileApi.me()
        .then(res => {
        dispatch(getProfileAC(res.data));
        dispatch(login(true));
    })
        .catch(error => {
            dispatch(showAnswer(error.response.data.error +
                    "Getting data is failed",
                    Status.error,
                )
            );
        })
        .finally(() => {
            dispatch(loading(false));
        });
};

export const logoutTC = () => (dispatch: TypedDispatch) => {
    dispatch(loading(true));
    profileApi.logout()
        .then(res => {
        dispatch(login(false));
        dispatch(showAnswer('You have logged out successfully', Status.success));
    })
        .catch(error => {
            dispatch(showAnswer(error.response.data.error +
                    "Logout is failed",
                    Status.error,
                )
            );
        })
        .finally(() => {
            dispatch(loading(false));
        });
};

export const changeProfileTC =
    (data: ProfileDataType) => (dispatch: TypedDispatch) => {
        dispatch(loading(true));
        profileApi.changeProfile(data)
            .then(res => {
                dispatch(changeProfileNameAC(res.data.updatedUser.name));
                dispatch(showAnswer('Profile has been successfully changed', Status.success));
            })
            .catch(error => {
                dispatch(showAnswer(error.response.data.error +
                        "Changing is failed",
                        Status.error,
                    )
                );
            })
            .finally(() => {
                dispatch(loading(false));
            });
    };

// type
export type ProfileStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
    ;

export type ProfileActionsType =
    GetProfileActionType
    | ChangeProfileNameActionType
    | ReturnType<typeof login>
    | loadingType
    | showAnswerType
    | closeAnswerType;

type GetProfileActionType = ReturnType<typeof getProfileAC>;
type ChangeProfileNameActionType = ReturnType<typeof changeProfileNameAC>;
