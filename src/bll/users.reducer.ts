import {IUser} from "../models/IUser";
import {ThunkDispatchType} from "../utils/hooks/useApDispatch";
import {FollowAPI, UserAPI} from "../dal/html.api";
import {setAppStatus} from "./app.reducer";
import axios from "axios";
import {logoutRemoveData} from "../utils/logoutRemoveData";
import {AppStatus} from "../models/AppStatus";

export type UsersActionsType = ReturnType<typeof setUsers>
    | ReturnType<typeof setIsUsersFetching>
    | ReturnType<typeof addUserIdFollowing>
    | ReturnType<typeof removeUserIdFollowing>
    | ReturnType<typeof updateUser>
    | ReturnType<typeof setUsersCurrentPage>
    | ReturnType<typeof setCountOnPage>
    | ReturnType<typeof setTotalPage>
    | ReturnType<typeof setUsersInitSate>;

enum UsersAction {
    SET_IS_USERS_FETCHING = "SET_IS_USERS_FETCHING",
    SET_USERS = "SET_USERS",
    SET_USERS_CURRENT_PAGE = "SET_USERS_CURRENT_PAGE",
    SET_COUNT_ON_PAGE = "SET_COUNT_ON_PAGE",
    SET_TOTAL_PAGE = "SET_TOTAL_PAGE",
    UPDATE_USER = "UPDATE_USER",
    ADD_USER_ID_FOLLOWING = "ADD_USER_ID_FOLLOWING",
    REMOVE_USER_ID_FOLLOWING = "REMOVE_USER_ID_FOLLOWING",
    SET_USERS_INIT_STATE = "SET_USERS_INIT_STATE",
}

type UsersStateType = {
    isUsersFetching: boolean
    users: Array<IUser>
    usersIdFollowing: Array<number>
    currentPage: number
    countOnPage: number
    totalPageCount: number
};

const usersInitState: UsersStateType = {
    isUsersFetching: false,
    users: [],
    usersIdFollowing: [],
    currentPage: 1,
    countOnPage: 4,
    totalPageCount: 0,
};

export const usersReducer = (state: UsersStateType = usersInitState, action: UsersActionsType): UsersStateType => {
    switch (action.type) {
        case UsersAction.SET_IS_USERS_FETCHING:
        case UsersAction.SET_USERS:
        case UsersAction.SET_USERS_CURRENT_PAGE:
        case UsersAction.SET_COUNT_ON_PAGE:
        case UsersAction.SET_TOTAL_PAGE:
            return {...state, ...action.payload};
        case UsersAction.UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.user.id ? action.payload.user : user)
            };
        case UsersAction.ADD_USER_ID_FOLLOWING:
            return {...state, usersIdFollowing: [...state.usersIdFollowing, action.payload.id]};
        case UsersAction.REMOVE_USER_ID_FOLLOWING:
            return {...state, usersIdFollowing: state.usersIdFollowing.filter(id => id !== action.payload.id)};
        case UsersAction.SET_USERS_INIT_STATE:
            return {...usersInitState};
        default:
            return state;
    }
};


const setIsUsersFetching = (isUsersFetching: boolean) => {
    return {
        type: UsersAction.SET_IS_USERS_FETCHING,
        payload: {isUsersFetching}
    } as const;
};

const setUsers = (users: Array<IUser>) => {
    return {
        type: UsersAction.SET_USERS,
        payload: {users}
    } as const;
};

const updateUser = (user: IUser) => {
    return {
        type: UsersAction.UPDATE_USER,
        payload: {user}
    } as const;
};

const addUserIdFollowing = (id: number) => {
    return {
        type: UsersAction.ADD_USER_ID_FOLLOWING,
        payload: {id}
    } as const;
};

const removeUserIdFollowing = (id: number) => {
    return {
        type: UsersAction.REMOVE_USER_ID_FOLLOWING,
        payload: {id}
    } as const;
};

export const setUsersCurrentPage = (currentPage: number) => {
    return {
        type: UsersAction.SET_USERS_CURRENT_PAGE,
        payload: {currentPage}
    } as const;
};

const setCountOnPage = (countOnPage: number) => {
    return {
        type: UsersAction.SET_COUNT_ON_PAGE,
        payload: {countOnPage}
    } as const;
};

const setTotalPage = (totalPageCount: number) => {
    return {
        type: UsersAction.SET_TOTAL_PAGE,
        payload: {totalPageCount}
    } as const;
};

export const setUsersInitSate = () => {
    return {
        type: UsersAction.SET_USERS_INIT_STATE,
    } as const;
};

export const getUsersTC = (count: number, page: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsUsersFetching(true));

        const response = await UserAPI.getUsers(count, page);
        const {totalCount, users} = response.data;
        const totalPageCount = Math.ceil(totalCount / count);

        dispatch(setTotalPage(totalPageCount));
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

export const followUserTC = (id: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(addUserIdFollowing(id));

        const response = await FollowAPI.follow(id);
        dispatch(updateUser(response.data.user));

        dispatch(setAppStatus(AppStatus.SUCCESS));
        dispatch(removeUserIdFollowing(id));
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
        dispatch(removeUserIdFollowing(id));
        return Promise.reject(errorMessage);
    }
};

export const unFollowUserTC = (id: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(addUserIdFollowing(id));

        const response = await FollowAPI.unFollow(id);
        dispatch(updateUser(response.data.user));

        dispatch(setAppStatus(AppStatus.SUCCESS));
        dispatch(removeUserIdFollowing(id));
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
        dispatch(removeUserIdFollowing(id));
        return Promise.reject(errorMessage);
    }
};

