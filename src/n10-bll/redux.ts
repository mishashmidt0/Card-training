import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LoginActionsType, loginReducer } from '../n2-auth/a1-login/login-reducer';
import { RegisterActionsType, registerReducer } from '../n2-auth/a2-register/register-reducer';
import { forgotReducer } from '../n2-auth/a3-forgot/forgot-reducer';
import { profileReducer } from '../n1-main/m2-Profile/profile-reducer';
import { packsListReducer } from '../n1-main/m1-PacksList/pecksList-reducer';
import { useDispatch } from 'react-redux';
import { AppActionsType, appReducer } from '../n1-main/app-reducer';

const reducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
  forgot: forgotReducer,
  profile: profileReducer,
  packsList: packsListReducer,
  app: appReducer,
});
export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof reducers>

export type AllActionType = RegisterActionsType | LoginActionsType | AppActionsType/*| ProfileActionsType*/
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionType>


export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AllActionType>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

//@ts-ignore
window.store = store;

