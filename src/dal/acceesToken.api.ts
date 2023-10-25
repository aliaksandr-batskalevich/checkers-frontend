import {StorageKeys} from "../models/StorageKeys";

export const writeAccessTokenInLS = (accessToken: string) => localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);

export const readAccessTokenInLS = () => localStorage.getItem(StorageKeys.ACCESS_TOKEN);

export const removeAccessTokenInLS = () => localStorage.removeItem(StorageKeys.ACCESS_TOKEN);