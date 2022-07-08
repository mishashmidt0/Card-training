import axios from 'axios';

import { baseUrlAuth } from '../a5-constants/constants';

const instace = axios.create({
  baseURL: baseUrlAuth,
  withCredentials: true,
});

export type dataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const loginApi = {
  login(data: dataType) {
    return instace.post('auth/login', data);
  },
};
