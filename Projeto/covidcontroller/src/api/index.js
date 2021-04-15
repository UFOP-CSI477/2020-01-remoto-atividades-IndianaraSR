import axios from 'axios';
import { validadorToken } from './middleware';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

api.interceptors.response.use((req) => {
    return req;
}, (error) => {
    validadorToken(error);
    return Promise.reject(error);
});

export default api;