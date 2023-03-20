import {RootStateType} from "./store";
import {IUser} from "../models/IUser";

// auth
export const getIsAuthing = (state: RootStateType): boolean => state.auth.isAuthing;
export const getIsAuth = (state: RootStateType): boolean => state.auth.isAuth;
export const getId = (state: RootStateType): null | number => state.auth.id;

// users
export const getProfile = (state: RootStateType): null | IUser => state.profile.profile;