import axios from 'axios';
import {AuthResponse} from "../models/responses/auth.response";
import {readAccessTokenInLS, writeAccessTokenInLS} from "./acceesToken.api";

// SERVER IP
const baseURL = process.env.REACT_APP_SERVER_ENDPOINT || 'http://185.250.46.14/api/';

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

        if (error.response.status === 401 && !originalRequest._isRetry) {
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