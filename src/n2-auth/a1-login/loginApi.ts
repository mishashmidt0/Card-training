import axios from 'axios';

const instace = axios.create({
  baseURL: 'http://localhost:7542/2.0',
  withCredentials: true
});

export type dataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const loginApi = {
  async login(data: dataType) {
    const res = instace.post('/auth/login', data);
    return res;
  },
};
