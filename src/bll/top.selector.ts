import {createSelector} from "reselect";
import {RootStateType} from "./store";
import {ITopUser, IUser} from "../models/IUser";


export const getIsTopUsersFetching = (state: RootStateType): boolean => state.topUsers.isTopUsersFetching;
const getTopFullUsers = (state: RootStateType): Array<IUser> => state.topUsers.topUsers;

// SELECTORS BY RESELECT
export const getTopUsers = createSelector(getTopFullUsers, (topFullUsers: Array<IUser>): Array<ITopUser> => topFullUsers.map(user => {
    const {id, username, rating} = user;
    return {id, username, rating};
}));
