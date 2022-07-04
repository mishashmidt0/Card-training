import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export type ProfileDataType = {
  name?: string;
  avatar?: string;
};

enum Auth {
  me = '/auth/me',
}

export const profileApi = {
  me() {
    return instance.post(Auth.me, {});
  },
  changeProfile(data: ProfileDataType) {
    return instance.put(Auth.me, data);
  },
  logout() {
    return instance.delete(Auth.me, {});
  },
};
