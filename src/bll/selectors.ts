import {RootStateType} from "./store";
import {IUser} from "../models/IUser";

// app
export const getIsAppInit = (state: RootStateType): boolean => state.app.isAppInit;

// auth
export const getIsAuthing = (state: RootStateType): boolean => state.auth.isAuthing;
export const getIsAuth = (state: RootStateType): boolean => state.auth.isAuth;
export const getAuthId = (state: RootStateType): null | number => state.auth.authId;
export const getIsActivated = (state: RootStateType): boolean => state.auth.isActivated;

// users
export const getProfile = (state: RootStateType): null | IUser => state.profile.profile;
export const getUsername = (state: RootStateType): undefined | string => state.profile.profile?.username;

