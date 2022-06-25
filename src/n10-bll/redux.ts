import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loginReducer } from '../n2-auth/a1-login/login-reducer';
import { registerReducer } from '../n2-auth/a2-register/register-reducer';
import { forgotReducer } from '../n2-auth/a3-forgot/forgot-reducer';
import { profileReducer } from '../n1-main/m2-Profile/profile-reducer';
import { packsListReducer } from '../n1-main/m1-PacksList/pecksList-reducer';

const reducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
  forgot: forgotReducer,
  profile: profileReducer,
  packsList: packsListReducer,
});
export const store = createStore(reducers, applyMiddleware(thunk));

//@ts-ignore
window.store = store;
