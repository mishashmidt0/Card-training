import { login } from '../../n2-auth/a1-login/login-reducer';
import { handleNetworkError } from '../../n2-auth/a4-utils/handle-error-utils';
import { TypedDispatch } from '../../n5-bll/redux';
import {
  closeAnswerType,
  loading,
  loadingType,
  setGlobalLoadingAC,
  showAnswer,
  showAnswerType,
  Status,
} from '../m0-App/app-reducer';

import { profileApi, ProfileDataType } from './profileApi';

// enum
enum ActionType {
  getProfile = 'PROFILE/GET-PROFILE',
  changeProfileName = 'PROFILE/CHANGE-PROFILE-NAME',
}

const initialState: InitialStateType = {
  profile: {},
};

export const profileReducer = (
  // eslint-disable-next-line default-param-last
  state: InitialStateType = initialState,
  action: ProfileActionsType,
): InitialStateType => {
  switch (action.type) {
    case ActionType.getProfile:
      return { ...state, profile: action.profile };
    case ActionType.changeProfileName:
      return { ...state, profile: { ...state.profile, name: action.newName } };
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
export const getUserProfileTC = () => async (dispatch: TypedDispatch) => {
  dispatch(loading(true));

  try {
    const res = await profileApi.me();

    dispatch(getProfileAC(res.data));
    dispatch(login(true));
  } finally {
    dispatch(loading(false));
    dispatch(setGlobalLoadingAC(true));
  }
};

export const logoutTC = () => async (dispatch: TypedDispatch) => {
  dispatch(loading(true));

  try {
    await profileApi.logout();
    dispatch(login(false));
    dispatch(showAnswer('You have logged out successfully', Status.success));
  } catch (error: any) {
    handleNetworkError(error, dispatch);
  } finally {
    dispatch(loading(false));
  }
};

export const changeProfileTC =
  (data: ProfileDataType) => async (dispatch: TypedDispatch) => {
    dispatch(loading(true));

    try {
      const res = await profileApi.changeProfile(data);

      dispatch(changeProfileNameAC(res.data.updatedUser.name));
      dispatch(showAnswer('Profile has been successfully changed', Status.success));
    } catch (error: any) {
      handleNetworkError(error, dispatch);
    } finally {
      dispatch(loading(false));
    }
  };

// type
type InitialStateType = {
  profile: {} | ProfileStateType;
};
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
};
export type ProfileActionsType =
  | GetProfileActionType
  | ChangeProfileNameActionType
  | ReturnType<typeof login>
  | loadingType
  | showAnswerType
  | closeAnswerType;

type GetProfileActionType = ReturnType<typeof getProfileAC>;
type ChangeProfileNameActionType = ReturnType<typeof changeProfileNameAC>;
