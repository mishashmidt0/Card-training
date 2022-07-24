import axios from 'axios';

import { baseUrlAuth } from '../a5-constants/constants';

export const instance = axios.create({
  baseURL: baseUrlAuth,
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
