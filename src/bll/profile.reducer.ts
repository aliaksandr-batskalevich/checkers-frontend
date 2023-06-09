import {IUser} from "../models/IUser";
import {ThunkDispatchType} from "../utils/hooks";
import {AppStatus, setAppStatus} from "./app.reducer";
import {FollowAPI, StatusAPI, UserAPI} from "../dal/html.api";
import axios from "axios";
import {logoutRemoveData} from "../utils/logoutRemoveData";

export type ProfileActionsType = ReturnType<typeof setProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setIsProfileFetching>
    | ReturnType<typeof setIsFollowing>
    | ReturnType<typeof setIsStatusCreating>
    | ReturnType<typeof setProfileInitState>;

export type ProfileStateType = {
    isProfileFetching: boolean
    isFollowing: boolean
    isStatusCreating: boolean
    profile: null | IUser
};

const profileInitState: ProfileStateType = {
    isProfileFetching: false,
    isFollowing: false,
    isStatusCreating: false,
    profile: null,
};

export const profileReducer = (state: ProfileStateType = profileInitState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case "SET_IS_FETCHING":
            return {...state, ...action.payload};
        case "PROFILE_SET_IS_FOLLOWING":
            return {...state, ...action.payload};
        case "PROFILE_SET_IS_STATUS_CREATING":
            return {...state, ...action.payload};
        case "SET_PROFILE":
            return {...state, ...action.payload};
        case "PROFILE_SET_STATUS":
            return {...state, profile: {...state.profile!, ...action.payload}};
        case "SET_PROFILE_INIT_STATE":
            return {...profileInitState};
        default:
            return state;
    }
};

const setIsProfileFetching = (isProfileFetching: boolean) => {
    return {
        type: 'SET_IS_FETCHING',
        payload: {isProfileFetching}
    } as const;
};

const setIsFollowing = (isFollowing: boolean) => {
    return {
        type: 'PROFILE_SET_IS_FOLLOWING',
        payload: {isFollowing}
    } as const;
};

const setIsStatusCreating = (isStatusCreating: boolean) => {
    return {
        type: 'PROFILE_SET_IS_STATUS_CREATING',
        payload: {isStatusCreating}
    } as const;
};

export const setProfile = (profile: IUser | null) => {
    return {
        type: 'SET_PROFILE',
        payload: {profile}
    } as const;
};

export const setStatus = (status: null | string) => {
    return {
        type: 'PROFILE_SET_STATUS',
        payload: {status}
    } as const;
};

export const setProfileInitState = () => {
    return {
        type: 'SET_PROFILE_INIT_STATE'
    } as const;
};

export const getUserTC = (id: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsProfileFetching(true));

        const response = await UserAPI.getUser(id);
        dispatch(setProfile(response.data.user));
        dispatch(setIsProfileFetching(false));
        dispatch(setAppStatus(AppStatus.SUCCESS));
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data.message
                : error.message;

            // logout if status 401
            error.response?.status === 401 && logoutRemoveData(dispatch);

        } else {
            //@ts-ignore
            errorMessage = error.message;
        }
        console.log(errorMessage);
        dispatch(setIsProfileFetching(false));
        dispatch(setAppStatus(AppStatus.FAILED));
        return Promise.reject(errorMessage);
    }
};

export const followProfileTC = (id: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsFollowing(true));

        const response = await FollowAPI.follow(id);
        dispatch(setProfile(response.data.user));

        dispatch(setIsFollowing(false));
        dispatch(setAppStatus(AppStatus.SUCCESS));
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data.message
                : error.message;

            // logout if status 401
            error.response?.status === 401 && logoutRemoveData(dispatch);

        } else {
            //@ts-ignore
            errorMessage = error.message;
        }
        console.log(errorMessage);
        dispatch(setIsFollowing(false));
        dispatch(setAppStatus(AppStatus.FAILED));
        return Promise.reject(errorMessage);
    }
};

export const unFollowProfileTC = (id: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsFollowing(true));

        const response = await FollowAPI.unFollow(id);
        dispatch(setProfile(response.data.user));

        dispatch(setIsFollowing(false));
        dispatch(setAppStatus(AppStatus.SUCCESS));
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data.message
                : error.message;

            // logout if status 401
            error.response?.status === 401 && logoutRemoveData(dispatch);

        } else {
            //@ts-ignore
            errorMessage = error.message;
        }
        console.log(errorMessage);
        dispatch(setIsFollowing(false));
        dispatch(setAppStatus(AppStatus.FAILED));
        return Promise.reject(errorMessage);
    }
};

export const createStatusTC = (status: null | string) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsStatusCreating(true));

        const response = await StatusAPI.createStatus(status);
        dispatch(setStatus(response.data.status));

        dispatch(setIsStatusCreating(false));
        dispatch(setAppStatus(AppStatus.SUCCESS));
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data.message
                : error.message;

            // logout if status 401
            error.response?.status === 401 && logoutRemoveData(dispatch);

        } else {
            //@ts-ignore
            errorMessage = error.message;
        }
        console.log(errorMessage);
        dispatch(setIsStatusCreating(false));
        dispatch(setAppStatus(AppStatus.FAILED));
        return Promise.reject(errorMessage);
    }
};

