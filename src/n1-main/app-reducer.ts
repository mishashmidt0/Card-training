import { Dispatch } from 'redux';

enum ActionType {
  show = 'SHOW',
  close = 'CLOSE',
}

export enum Status {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error',
}

const initialState: appStateType = {
  snackbar: {
    isShow: false,
    message: '',
    status: Status.success,
  },
};

export const appReducer = (
  app: appStateType = initialState,
  action: AppActionsType,
): appStateType => {
  switch (action.type) {
    case ActionType.show:
      return { ...app, snackbar: { ...action.snackbar, isShow: true } };
    case ActionType.close:
      return { ...app, snackbar: { ...app.snackbar, isShow: false } };
    default:
      return app;
  }
};

// action
export const showAnswer = (message: string, status: statusType) =>
  ({ type: ActionType.show, snackbar: { message, status } } as const);
export const closeAnswer = () => ({ type: ActionType.close } as const);

// thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {};

// type
export type statusType = Status.warning | Status.info | Status.error | Status.success;
export type snackbarType = {
  isShow: boolean;
  message: string;
  status: statusType;
};
export type appStateType = {
  snackbar: snackbarType;
};

export type showAnswerType = ReturnType<typeof showAnswer>;
export type closeAnswerType = ReturnType<typeof closeAnswer>;

export type AppActionsType = showAnswerType | closeAnswerType;
