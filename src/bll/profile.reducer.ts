import {IUser} from "../models/IUser";
import {ThunkDispatchType} from "../utils/hooks";
import {AppStatus, setAppStatus} from "./app.reducer";
import {AuthAPI, UserAPI} from "../dal/api";
import axios from "axios";

export type ProfileActionsType = ReturnType<typeof setProfile>
    | ReturnType<typeof setIsFetching>;

export type ProfileStateType = {
    isFetching: boolean
    profile: null | IUser
};

const profileInitState: ProfileStateType = {
    isFetching: false,
    profile: null,
};

export const profileReducer = (state: ProfileStateType = profileInitState, action: ProfileActionsType) => {
    switch (action.type) {
        case "SET_IS_FETCHING":
            return {...state, ...action.payload};
        case "SET_PROFILE":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

const setIsFetching = (isFetching: boolean) => {
    return {
        type: 'SET_IS_FETCHING',
        payload: {isFetching}
    } as const;
};

export const setProfile = (profile: IUser | null) => {
    return {
        type: 'SET_PROFILE',
        payload: {profile}
    } as const;
};

export const getUserTC = (id: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsFetching(true));

        const response = await UserAPI.getUser(id);
        dispatch(setProfile(response.data.user));
        dispatch(setIsFetching(false));
        dispatch(setAppStatus(AppStatus.SUCCESS));
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data.message
                : error.message;
        } else {
            //@ts-ignore
            errorMessage = error.message;
        }
        console.log(errorMessage);
        dispatch(setAppStatus(AppStatus.FAILED));
        return Promise.reject(errorMessage);
    }
}

