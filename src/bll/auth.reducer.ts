import {ThunkDispatchType} from "../utils/hooks";
import {AuthAPI} from "../dal/api";
import {setProfile} from "./profile.reducer";
import {AppStatus, setAppStatus} from "./app.reducer";
import axios from "axios";

export type AuthActionsType = ReturnType<typeof setIsAuthing>
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setId>
    | ReturnType<typeof setIsActivated>;

type AuthStateType = {
    isAuthing: boolean
    isAuth: boolean
    authId: null | number
    isActivated: boolean
};

const authInitState: AuthStateType = {
    isAuthing: false,
    isAuth: false,
    authId: null,
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
        case "SET_IS_ACTIVATED":
            return {...state, ...action.payload};
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
const setId = (authId: null | number) => {
    return {
        type: 'SET_AUTH_ID',
        payload: {authId}
    } as const;
};
const setIsActivated = (isActivated: boolean) => {
    return {
        type: 'SET_IS_ACTIVATED',
        payload: {isActivated}
    } as const;
};

export const signUpTC = (username: string, email: string, password: string) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsAuthing(true));

        const response = await AuthAPI.signUp(username, email, password);
        const user = response.data.user;
        localStorage.setItem('accessToken', response.data.tokens.accessToken);

        dispatch(setIsAuth(true));
        dispatch(setId(user.id));
        dispatch(setIsActivated(user.isActivated));
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
        const user = response.data.user;
        localStorage.setItem('accessToken', response.data.tokens.accessToken);

        dispatch(setIsAuth(true));
        dispatch(setId(user.id));
        dispatch(setIsActivated(user.isActivated));
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
        localStorage.setItem('accessToken', response.data.tokens.accessToken);

        dispatch(setIsAuth(true));
        dispatch(setId(user.id));
        dispatch(setIsActivated(user.isActivated));
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
        localStorage.removeItem('accessToken');

        dispatch(setIsAuth(false));
        dispatch(setId(null));
        dispatch(setIsActivated(true));
        dispatch(setProfile(null));
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
}