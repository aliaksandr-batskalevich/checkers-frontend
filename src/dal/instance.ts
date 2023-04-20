import axios from 'axios';
import {AuthResponse} from "../models/auth.response";
import {readAccessTokenInLS, writeAccessTokenInLS} from "../utils/acceesTokenLS";

// SERVER IP
// const baseURL = 'http://35.239.107.150/api/';

// URL FOR DEV
const baseURL = 'http://localhost:8080/api/';

const axiosOptions = {
    withCredentials: true,
    baseURL,
};

export const refreshInstance = axios.create(axiosOptions);


const instance = axios.create(axiosOptions);

instance.interceptors.request.use((config) => {
    const accessToken = readAccessTokenInLS();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

instance.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await refreshInstance.get<AuthResponse>('auth/refresh');
                writeAccessTokenInLS(response.data.data.tokens.accessToken);

                return instance.request(originalRequest);
            } catch (error) {
                console.log('RefreshToken expired!');
            }

        }

        // is status !== 401 or status 401 after refresh
        throw error;
    });

export default instance;