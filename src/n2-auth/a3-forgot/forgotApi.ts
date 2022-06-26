import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
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
};

export type ForgotPasswordParamsType = {
  email: string;
  from: string;
  message: string;
};

export type ResponseRegisterType = {
  info: string;
  error: string;
};
