import {RootStateType} from "./store";
import {IUser} from "../models/IUser";


export const getIsProfileFetching = (state: RootStateType): boolean => state.profile.isProfileFetching;
export const getIsProfileFollowing = (state: RootStateType): boolean => state.profile.isFollowing;
export const getIsProfileStatusCreating = (state: RootStateType): boolean => state.profile.isStatusCreating;
export const getProfile = (state: RootStateType): null | IUser => state.profile.profile;
export const getProfileStatus = (state: RootStateType): null | string => state.profile.profile!.status;