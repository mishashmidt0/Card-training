import { Dispatch } from 'redux';
import { registerApi, RegisterParamsType } from './registerApi';


const initialState = {
  isRegistered: false,
};
type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionsType): InitialStateType => {
  switch (action.type) {
    case 'register/SET-IS-REGISTERED':
      return { ...state, isRegistered: action.value };
    default:
      return state;
  }
};

// actions
export const setIsRegisteredAC = (value: boolean) => ({ type: 'register/SET-IS-REGISTERED', value } as const);

// thunks
export const registerTC = (data: RegisterParamsType) => (dispatch: Dispatch<RegisterActionsType>) => {
  registerApi.registerUser(data)
    .then(() => {
        dispatch(setIsRegisteredAC(true));
    })
    .catch(error => {
      dispatch(setIsRegisteredAC(false));
      alert(error.response.data.error + ' If you don\'t remember your password go to \'forgot\'');
    });

};

// types
export type RegisterActionsType = ReturnType<typeof setIsRegisteredAC>