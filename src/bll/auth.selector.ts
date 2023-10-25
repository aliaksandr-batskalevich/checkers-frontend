import {RootStateType} from "./store";


export const getIsAuthing = (state: RootStateType): boolean => state.auth.isAuthing;
export const getIsAuth = (state: RootStateType): boolean => state.auth.isAuth;
export const getAuthId = (state: RootStateType): null | number => state.auth.authId;
export const getAuthUsername = (state: RootStateType): null | string => state.auth.authUsername;
export const getIsActivated = (state: RootStateType): boolean => state.auth.isActivated;