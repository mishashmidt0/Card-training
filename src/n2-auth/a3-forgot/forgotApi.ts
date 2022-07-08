import axios from 'axios';

import { baseUrlAuth } from '../a5-constants/constants';

export const instance = axios.create({
  baseURL: baseUrlAuth,
  withCredentials: true,
});

export const forgotApi = {
  forgotPassword(email: string) {
    const data = {
      email,
      from: 'test-front-admin <ai73a@yandex.by>',

      message: `<div style='background-color: #88c9e0; padding: 15px'>
                  Password recovery link: 
                <a href='http://localhost:3000/#/set-new-password/$token$'>LINK</a></div>`,
    };

    return instance.post<ForgotPasswordParamsType, ResponseRegisterType>(
      'auth/forgot',
      data,
    );
  },

  createNewPassword(newPassword: newPasswordType) {
    return instance.post<newPasswordType, ResponseNewPassword>(
      'auth/set-new-password',
      newPassword,
    );
  },
};

// type
export type ForgotPasswordParamsType = {
  email: string;
  from: string;
  message: string;
};
export type ResponseRegisterType = {
  info: string;
  error: string;
};
export type newPasswordType = {
  password: string;
  resetPasswordToken: string;
};

export interface ResponseNewPassword {
  data: {
    info: string;
    error: string;
  };
}
