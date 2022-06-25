import axios from 'axios';

const instace = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
});

type DataType = {
    name?: string,
    avatar?: string
}

export const profileApi = {
     me() {
         return instace.post('/auth/me');
    },
    changeProfile(data: DataType) {
         return instace.put('/auth/me', data)
    },
    logout() {
         return instace.delete('/auth/me')
    }
};