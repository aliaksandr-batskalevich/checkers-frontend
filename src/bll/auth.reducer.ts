import {ThunkDispatchType} from "../utils/hooks";
import {AuthAPI} from "../dal/api";
import {setProfile} from "./profile.reducer";
import {AppStatus, setAppStatus} from "./app.reducer";
import axios from "axios";

export type AuthActionsType = ReturnType<typeof setIsAuthing>
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setId>;

type AuthStateType = {
    isAuthing: boolean
    isAuth: boolean
    id: null | number
};

const authInitState: AuthStateType = {
    isAuthing: false,
    isAuth: false,
    id: null,
};

export const authReducer = (state: AuthStateType = authInitState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case "SET_IS_AUTHING":
            return {...state, ...action.payload};
        case "SET_IS_AUTH":
            return {...state, ...action.payload};
        case "SET_ID":
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
const setId = (id: null | number) => {
    return {
        type: 'SET_ID',
        payload: {id}
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
        dispatch(setProfile(user));
        dispatch(setIsAuthing(false));
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

export const signInTC = (username: string, password: string) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsAuthing(true));

        const response = await AuthAPI.signIn(username, password);
        const user = response.data.user;
        localStorage.setItem('accessToken', response.data.tokens.accessToken);

        dispatch(setIsAuth(true));
        dispatch(setId(user.id));
        dispatch(setProfile(user));
        dispatch(setIsAuthing(false));
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