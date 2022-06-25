import { Dispatch } from 'redux';

enum ActionType {
  show = 'SHOW',
  close = 'CLOSE',
}

export enum Value {
  show = 'show',
  close = 'close',
}

export enum Cover {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error',
}

const initialState: appStateType = {
  snackbar: {
    value: Value.close,
    message: '',
    cover: Cover.success,
  },

};

export const appReducer = (app: appStateType = initialState, action: AppActionsType): appStateType => {

  switch (action.type) {
    case ActionType.show:
      return { ...app, snackbar: action.snackbar };
    case ActionType.close:
      return { ...app, snackbar: { ...app.snackbar, value: Value.close } };
    default:
      return app;
  }
};

// action
export const showAnswer = (value: statusType, message: string, cover: coverType) => ({ type: ActionType.show, snackbar: { value, message, cover } } as const);
export const closeAnswer = () => ({ type: ActionType.close } as const);


// thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {

};

// type
export type statusType = Value.show | Value.close
export type coverType = Cover.warning | Cover.info | Cover.error | Cover.success
export type snackbarType = {
  value: statusType,
  message: string,
  cover: coverType
}
export type appStateType = {
  snackbar: snackbarType
}


export type showAnswerType = ReturnType<typeof showAnswer>
export type closeAnswerType = ReturnType<typeof closeAnswer>

export type AppActionsType =
  | showAnswerType
  | closeAnswerType





