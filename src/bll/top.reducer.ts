import {IUser} from "../models/IUser";
import {ThunkDispatchType} from "../utils/hooks";
import {TopUsersAPI} from "../dal/api";
import {AppStatus, setAppStatus} from "./app.reducer";
import axios from "axios";

export type TopUsersActionsType = ReturnType<typeof setIsTopUsersFetching>
    | ReturnType<typeof setTopUsers>
    | ReturnType<typeof setTopUsersInitSate>;

type TopUsersStateType = {
    isTopUsersFetching: boolean
    topUsers: Array<IUser>
};

const topUsersInitState: TopUsersStateType = {
    isTopUsersFetching: false,
    topUsers: [],
};

export const topUsersReducer = (state: TopUsersStateType = topUsersInitState, action: TopUsersActionsType): TopUsersStateType => {
    switch (action.type) {
        case "SET_IS_TOP_USERS_FETCHING":
            return {...state, ...action.payload};
        case "SET_TOP_USERS":
            return {...state, ...action.payload};
        case "SET_TOP_USERS_INIT_STATE":
            return {...topUsersInitState};
        default:
            return state;
    }
};


const setIsTopUsersFetching = (isTopUsersFetching: boolean) => {
    return {
        type: 'SET_IS_TOP_USERS_FETCHING',
        payload: {isTopUsersFetching}
    } as const;
};
const setTopUsers = (topUsers: Array<IUser>) => {
    return {
        type: 'SET_TOP_USERS',
        payload: {topUsers}
    } as const;
};
export const setTopUsersInitSate = () => {
    return {
        type: 'SET_TOP_USERS_INIT_STATE'
    } as const;
};

export const getTopUsersTC = (count: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsTopUsersFetching(true));

        const response = await TopUsersAPI.getTopUsers(count);
        const {topUsers} = response.data;

        dispatch(setTopUsers(topUsers));
        dispatch(setAppStatus(AppStatus.SUCCESS));
        dispatch(setIsTopUsersFetching(false));
    } catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error)) {
            errorMessage = error.response
                ? error.response.data.message
                : error.message;

            // logout if status 401
            error.response?.status === 401 && dispatch(setTopUsersInitSate());

        } else {
            //@ts-ignore
            errorMessage = error.message;
        }
        console.log(errorMessage);
        dispatch(setAppStatus(AppStatus.FAILED));
        dispatch(setIsTopUsersFetching(false));
        return Promise.reject(errorMessage);
    }
};