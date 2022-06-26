import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0',
  withCredentials: true,
});

export type ProfileDataType = {
  name?: string;
  avatar?: string;
};

export const profileApi = {
  me() {
    return instance.post('/auth/me', {});
  },
  changeProfile(data: ProfileDataType) {
    return instance.put('/auth/me', data);
  },
  logout() {
    return instance.delete('/auth/me', {});
  },
};
