import {IUser} from "../models/IUser";
import {ThunkDispatchType} from "../utils/hooks";
import {UserAPI} from "../dal/api";
import {AppStatus, setAppStatus} from "./app.reducer";
import axios from "axios";
import {logoutRemoveData} from "../utils/logoutRemoveData";

export type UsersActionsType = ReturnType<typeof setUsers>
    | ReturnType<typeof setIsUsersFetching>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setCountOnPage>
    | ReturnType<typeof setTotalPage>
    | ReturnType<typeof setUsersInitSate>;

type UsersStateType = {
    isUsersFetching: boolean
    users: Array<IUser>
    currentPage: number
    countOnPage: number
    totalPage: number
};

const usersInitState: UsersStateType = {
    isUsersFetching: false,
    users: [],
    currentPage: 1,
    countOnPage: 4,
    totalPage: 0,
};

export const usersReducer = (state: UsersStateType = usersInitState, action: UsersActionsType) => {
    switch (action.type) {
        case "SET_IS_USERS_FETCHING":
            return {...state, ...action.payload};
        case "SET_USERS":
            return {...state, ...action.payload};
        case "SET_CURRENT_PAGE":
            return {...state, ...action.payload};
        case "SET_COUNT_ON_PAGE":
            return {...state, ...action.payload};
        case "SET_TOTAL_PAGE":
            return {...state, ...action.payload};
        case "SET_USERS_INIT_STATE":
            return {...usersInitState};
        default:
            return state;
    }
};


const setIsUsersFetching = (isUsersFetching: boolean) => {
    return {
        type: 'SET_IS_USERS_FETCHING',
        payload: {isUsersFetching}
    } as const;
};
const setUsers = (users: Array<IUser>) => {
    return {
        type: 'SET_USERS',
        payload: {users}
    } as const;
};
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: {currentPage}
    } as const;
};
const setCountOnPage = (countOnPage: number) => {
    return {
        type: 'SET_COUNT_ON_PAGE',
        payload: {countOnPage}
    } as const;
};
const setTotalPage = (totalPage: number) => {
    return {
        type: 'SET_TOTAL_PAGE',
        payload: {totalPage}
    } as const;
};
export const setUsersInitSate = () => {
    return {
        type: 'SET_USERS_INIT_STATE'
    } as const;
};

export const getUsersTC = (count: number, page: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsUsersFetching(true));

        const response = await UserAPI.getUsers(count, page);
        const {totalCount, users} = response.data;
        const totalPage = Math.ceil(totalCount / count);

        dispatch(setTotalPage(totalPage));
        dispatch(setUsers(users));
        dispatch(setAppStatus(AppStatus.SUCCESS));
        dispatch(setIsUsersFetching(false));
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
        dispatch(setAppStatus(AppStatus.FAILED));
        dispatch(setIsUsersFetching(false));
        return Promise.reject(errorMessage);
    }
};