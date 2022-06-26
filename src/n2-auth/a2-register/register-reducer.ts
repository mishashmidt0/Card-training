import { registerApi, RegisterParamsType } from './registerApi';
import { showAnswer, Status } from '../../n1-main/app-reducer';
import { TypedDispatch } from '../../n10-bll/redux';


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
export const registerTC = (data: RegisterParamsType) => (dispatch: TypedDispatch) => {
  registerApi.registerUser(data)
    .then(() => {
      dispatch(setIsRegisteredAC(true));
      dispatch(showAnswer('You have been successfully registered', Status.success))
    })
    .catch(error => {
      dispatch(setIsRegisteredAC(false));
      dispatch(showAnswer(error.response.data.error + ' If you don\'t remember your password go to \'forgot\'', Status.error))
    });

};

// types
export type RegisterActionsType = ReturnType<typeof setIsRegisteredAC>