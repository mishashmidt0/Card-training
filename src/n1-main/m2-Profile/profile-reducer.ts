import { profileApi, ProfileDataType } from './profileApi';
import { login } from '../../n2-auth/a1-login/login-reducer';
import { TypedDispatch } from '../../n10-bll/redux';

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
    case 'PROFILE/GET-PROFILE':
      return { ...state, profile: action.profile };
    case 'PROFILE/CHANGE-PROFILE-NAME':
      return { ...state, profile: { ...state.profile, name: action.newName } };
    default:
      return state;
  }
};

// actions

export const getProfileAC = (profile: ProfileStateType) =>
  ({
    type: 'PROFILE/GET-PROFILE',
    profile,
  } as const);

export const changeProfileNameAC = (newName: string) =>
  ({
    type: 'PROFILE/CHANGE-PROFILE-NAME',
    newName,
  } as const);

// thunk
export const getUserProfileTC = () => (dispatch: TypedDispatch) => {
  profileApi.me().then(res => {
    dispatch(getProfileAC(res.data));
    dispatch(login(true));
  });
};

export const logoutTC = () => (dispatch: TypedDispatch) => {
  profileApi.logout().then(res => {
    dispatch(login(false));
  });
};

export const changeProfileTC =
  (data: ProfileDataType) => (dispatch: TypedDispatch) => {
    profileApi.changeProfile(data).then(res => {
      dispatch(changeProfileNameAC(res.data.updatedUser.name));
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

export type ProfileActionsType = GetProfileActionType | ChangeProfileNameActionType | ReturnType<typeof login>;

type GetProfileActionType = ReturnType<typeof getProfileAC>;
type ChangeProfileNameActionType = ReturnType<typeof changeProfileNameAC>;
