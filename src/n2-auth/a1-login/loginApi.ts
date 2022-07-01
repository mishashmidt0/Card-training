import axios from 'axios';

const instace = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
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
