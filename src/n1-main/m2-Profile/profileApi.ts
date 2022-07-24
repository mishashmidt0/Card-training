import axios from 'axios';

import { baseUrlAuth } from '../../n2-auth/a5-constants/constants';

const instance = axios.create({
  baseURL: baseUrlAuth,
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
