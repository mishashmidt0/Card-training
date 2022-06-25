import axios from 'axios';

const instace = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
});

export type dataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const forgotApi = {
  async sendPassword(data: dataType) {
    const res = instace.post('/auth/login', data);
    return res;
  },
};
