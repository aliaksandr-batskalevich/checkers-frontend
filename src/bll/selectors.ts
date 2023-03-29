import {createSelector} from "reselect";
import {RootStateType} from "./store";
import {ITopUser, IUser} from "../models/IUser";
import {SnackbarMessageType} from "./snackbar.reducer";

// app
export const getIsAppInit = (state: RootStateType): boolean => state.app.isAppInit;

// auth
export const getIsAuthing = (state: RootStateType): boolean => state.auth.isAuthing;
export const getIsAuth = (state: RootStateType): boolean => state.auth.isAuth;
export const getAuthId = (state: RootStateType): null | number => state.auth.authId;
export const getAuthUsername = (state: RootStateType): null | string => state.auth.authUsername;
export const getIsActivated = (state: RootStateType): boolean => state.auth.isActivated;

// profile
export const getIsProfileFetching = (state: RootStateType): boolean => state.profile.isProfileFetching;
export const getProfile = (state: RootStateType): null | IUser => state.profile.profile;

// users
export const getIsUsersFetching = (state: RootStateType): boolean => state.users.isUsersFetching;
export const getCurrentPage = (state: RootStateType): number => state.users.currentPage;
export const getCountOnPage = (state: RootStateType): number => state.users.countOnPage;
export const getTotalPage = (state: RootStateType): number => state.users.totalPage;
export const getUsers = (state: RootStateType): Array<IUser> => state.users.users;

// topUsers
export const getIsTopUsersFetching = (state: RootStateType): boolean => state.topUsers.isTopUsersFetching;
const getTopFullUsers = (state: RootStateType): Array<IUser> => state.topUsers.topUsers;
export const getTopUsers = createSelector(getTopFullUsers, (topFullUsers: Array<IUser>): Array<ITopUser> => topFullUsers.map(user => {
    const {id, username, rating} = user;
    return {id, username, rating};
}));


// snackbar
export const getSnackbarMessages = (state: RootStateType): Array<SnackbarMessageType> => state.snackbar.snackbarMessages;
