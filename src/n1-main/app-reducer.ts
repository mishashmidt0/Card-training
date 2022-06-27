import { Dispatch } from 'redux';

//enum
enum ActionType {
  show = 'APP/SHOW',
  close = 'APP/CLOSE',
  load = 'APP/LOADING',
}

export enum Status {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error',
}

//init && reducer
const initialState: appStateType = {
  snackbar: {
    isShow: false,
    message: '',
    status: Status.success,
  },
  loading: false,
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
    case ActionType.load:
      return { ...app, loading: action.value };
    default:
      return app;
  }
};

// action
export const showAnswer = (message: string, status: statusType) =>
  ({ type: ActionType.show, snackbar: { message, status } } as const);
export const closeAnswer = () => ({ type: ActionType.close } as const);
export const loading = (value: boolean) => ({ type: ActionType.load, value } as const);

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
  loading: boolean;
};
export type showAnswerType = ReturnType<typeof showAnswer>;
export type closeAnswerType = ReturnType<typeof closeAnswer>;
export type loadingType = ReturnType<typeof loading>;

export type AppActionsType = showAnswerType | closeAnswerType | loadingType;
