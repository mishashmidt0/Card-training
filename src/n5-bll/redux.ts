import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppActionsType, appReducer } from '../n1-main/m0-App/app-reducer';
import {
  ProfileActionsType,
  profileReducer,
} from '../n1-main/m2-Profile/profile-reducer';
import { LoginActionsType, loginReducer } from '../n2-auth/a1-login/login-reducer';
import {
  RegisterActionsType,
  registerReducer,
} from '../n2-auth/a2-register/register-reducer';
import {
  ForgotPasswordActionsType,
  forgotReducer,
} from '../n2-auth/a3-forgot/forgot-reducer';
import {
  ActionCreateNewPass,
  newPasswordReducer,
} from '../n2-auth/a4-newPassword/newPassword-reducer';

const reducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
  forgot: forgotReducer,
  profile: profileReducer,
  app: appReducer,
  createPass: newPasswordReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof store.getState>;

export type AllActionType =
  | RegisterActionsType
  | LoginActionsType
  | AppActionsType
  | ActionCreateNewPass
  | ForgotPasswordActionsType
  | ProfileActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AllActionType
>;

export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AllActionType>;
export const useTypedDispatch = (): TypedDispatch => useDispatch<TypedDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
// @ts-ignore
window.store = store;
