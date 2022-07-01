import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});

export const registerApi = {
  registerUser(data: RegisterParamsType) {
    return instance.post<RegisterParamsType, ResponseRegisterType>('auth/register', data);
  },
};

export type RegisterParamsType = {
  email: string;
  password: string;
};
export type ResponseRegisterType = {
  error?: string;
};
