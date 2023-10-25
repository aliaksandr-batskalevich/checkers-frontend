import {RootStateType} from "./store";
import {IUser} from "../models/IUser";


export const getIsUsersFetching = (state: RootStateType): boolean => state.users.isUsersFetching;
export const getUsersIdFollowing = (state: RootStateType): Array<number> => state.users.usersIdFollowing;
export const getUsersCurrentPage = (state: RootStateType): number => state.users.currentPage;
export const getUsersCountOnPage = (state: RootStateType): number => state.users.countOnPage;
export const getUsersTotalPageCount = (state: RootStateType): number => state.users.totalPageCount;
export const getUsers = (state: RootStateType): Array<IUser> => state.users.users;
