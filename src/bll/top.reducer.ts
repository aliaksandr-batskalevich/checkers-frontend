import {IUser} from "../models/IUser";
import {ThunkDispatchType} from "../utils/hooks/useAppDispatch";
import {TopUsersAPI} from "../dal/html.api";
import {setAppStatus} from "./app.reducer";
import {AppStatus} from "../models/AppStatus";
import {errorProcessing} from "../utils/errorProcessing/errorProcessing";

export type TopUsersActionsType = ReturnType<typeof setIsTopUsersFetching>
    | ReturnType<typeof setTopUsers>
    | ReturnType<typeof setTopUsersInitSate>;

enum TopUsersAction {
    SET_IS_TOP_USERS_FETCHING = "SET_IS_TOP_USERS_FETCHING",
    SET_TOP_USERS = "SET_TOP_USERS",
    SET_TOP_USERS_INIT_STATE = "SET_TOP_USERS_INIT_STATE",
}

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
        case TopUsersAction.SET_IS_TOP_USERS_FETCHING:
        case TopUsersAction.SET_TOP_USERS:
            return {...state, ...action.payload};
        case TopUsersAction.SET_TOP_USERS_INIT_STATE:
            return {...topUsersInitState};
        default:
            return state;
    }
};


const setIsTopUsersFetching = (isTopUsersFetching: boolean) => {
    return {
        type: TopUsersAction.SET_IS_TOP_USERS_FETCHING,
        payload: {isTopUsersFetching}
    } as const;
};
const setTopUsers = (topUsers: Array<IUser>) => {
    return {
        type: TopUsersAction.SET_TOP_USERS,
        payload: {topUsers}
    } as const;
};
export const setTopUsersInitSate = () => {
    return {
        type: TopUsersAction.SET_TOP_USERS_INIT_STATE,
    } as const;
};

export const getTopUsersTC = (count: number) =>
    async (dispatch: ThunkDispatchType) => {
        try {
            dispatch(setAppStatus(AppStatus.REQUEST));
            dispatch(setIsTopUsersFetching(true));

            const response = await TopUsersAPI.getTopUsers(count);
            const {topUsers} = response.data;

            dispatch(setTopUsers(topUsers));
            dispatch(setAppStatus(AppStatus.SUCCESS));
            dispatch(setIsTopUsersFetching(false));

            return Promise.resolve(topUsers);
        } catch (error) {
            const errorMessage = errorProcessing(error);

            dispatch(setAppStatus(AppStatus.FAILED));
            dispatch(setIsTopUsersFetching(false));

            return Promise.reject(errorMessage);
        }
    };