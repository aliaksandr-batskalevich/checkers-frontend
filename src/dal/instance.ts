import axios from 'axios';

export const baseURL = 'http://localhost:8080/api/';

const instance = axios.create({
    withCredentials: true,
    baseURL,
});

instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

export default instance;