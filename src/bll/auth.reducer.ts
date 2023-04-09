import {ThunkDispatchType} from "../utils/hooks";
import {AuthAPI} from "../dal/html.api";
import {setProfile} from "./profile.reducer";
import {AppStatus, setAppStatus} from "./app.reducer";
import axios from "axios";
import {logoutRemoveData} from "../utils/logoutRemoveData";
import {writeAccessTokenInLS} from "../utils/acceesTokenLS";

export type AuthActionsType = ReturnType<typeof setIsAuthing>
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setAuthId>
    | ReturnType<typeof setAuthUsername>
    | ReturnType<typeof setIsActivated>
    | ReturnType<typeof setAuthInitState>;

type AuthStateType = {
    isAuthing: boolean
    isAuth: boolean
    authId: null | number
    authUsername: null | string
    isActivated: boolean
};

const authInitState: AuthStateType = {
    isAuthing: false,
    isAuth: false,
    authId: null,
    authUsername: null,
    isActivated: false,
};

export const authReducer = (state: AuthStateType = authInitState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case "SET_IS_AUTHING":
            return {...state, ...action.payload};
        case "SET_IS_AUTH":
            return {...state, ...action.payload};
        case "SET_AUTH_ID":
            return {...state, ...action.payload};
        case "SET_AUTH_USERNAME":
            return {...state, ...action.payload};
        case "SET_IS_ACTIVATED":
            return {...state, ...action.payload};
        case "SET_AUTH_INIT_STATE":
            return {...authInitState};
        default:
            return state;
    }
};


const setIsAuthing = (isAuthing: boolean) => {
    return {
        type: 'SET_IS_AUTHING',
        payload: {isAuthing}
    } as const;
};
const setIsAuth = (isAuth: boolean) => {
    return {
        type: 'SET_IS_AUTH',
        payload: {isAuth}
    } as const;
};
const setAuthId = (authId: null | number) => {
    return {
        type: 'SET_AUTH_ID',
        payload: {authId}
    } as const;
};
const setAuthUsername = (authUsername: null | string) => {
    return {
        type: 'SET_AUTH_USERNAME',
        payload: {authUsername}
    } as const;
};
const setIsActivated = (isActivated: boolean) => {
    return {
        type: 'SET_IS_ACTIVATED',
        payload: {isActivated}
    } as const;
};
export const setAuthInitState = () => {
    return {
        type: 'SET_AUTH_INIT_STATE'
    } as const;
};

export const signUpTC = (username: string, email: string, password: string) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsAuthing(true));

        const response = await AuthAPI.signUp(username, email, password);
        const user = response.data.user;
        writeAccessTokenInLS(response.data.tokens.accessToken);

        // set data in authReducer
        dispatch(setIsAuth(true));
        dispatch(setAuthId(user.id));
        dispatch(setAuthUsername(user.username));
        dispatch(setIsActivated(user.isActivated));

        // set data in userReducer
        dispatch(setProfile(user));

        dispatch(setIsAuthing(false));
        dispatch(setAppStatus(AppStatus.SUCCESS));

        return Promise.resolve(response.message);
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
        dispatch(setIsAuthing(false));
        dispatch(setAppStatus(AppStatus.FAILED));
        return Promise.reject(errorMessage);
    }
};

export const signInTC = (username: string, password: string) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsAuthing(true));

        const response = await AuthAPI.signIn(username, password);
        console.dir(response);
        const user = response.data.user;
        writeAccessTokenInLS(response.data.tokens.accessToken);

        // set data in authReducer
        dispatch(setIsAuth(true));
        dispatch(setAuthId(user.id));
        dispatch(setAuthUsername(user.username));
        dispatch(setIsActivated(user.isActivated));

        // set data in userReducer
        dispatch(setProfile(user));

        dispatch(setIsAuthing(false));
        dispatch(setAppStatus(AppStatus.SUCCESS));

        return Promise.resolve(response.message);
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
        dispatch(setIsAuthing(false));
        dispatch(setAppStatus(AppStatus.FAILED));
        return Promise.reject(errorMessage);
    }
};

export const refreshTC = () => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsAuthing(true));

        const response = await AuthAPI.refresh();
        const user = response.data.user;
        writeAccessTokenInLS(response.data.tokens.accessToken);

        // set data in authReducer
        dispatch(setIsAuth(true));
        dispatch(setAuthId(user.id));
        dispatch(setAuthUsername(user.username));
        dispatch(setIsActivated(user.isActivated));

        // set data in userReducer
        dispatch(setProfile(user));

        dispatch(setIsAuthing(false));
        dispatch(setAppStatus(AppStatus.SUCCESS));

        return Promise.resolve(response.message);
    }  catch (error) {
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
        dispatch(setIsAuthing(false));
        dispatch(setAppStatus(AppStatus.FAILED));
        return Promise.reject(errorMessage);
    }
};

export const logoutTC = () => async (dispatch: ThunkDispatchType) => {
    try {

        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsAuthing(true));

        const response = await AuthAPI.logout();

        // utiFn for clear data in reducers to init values
        // includes fn for remove accessToken in LS
        logoutRemoveData(dispatch);

        dispatch(setIsAuthing(false));
        dispatch(setAppStatus(AppStatus.SUCCESS));

        return Promise.resolve(response.message);
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
        dispatch(setIsAuthing(false));
        dispatch(setAppStatus(AppStatus.FAILED));
        return Promise.reject(errorMessage);
    }
};