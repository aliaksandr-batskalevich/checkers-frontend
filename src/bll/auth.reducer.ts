import {ThunkDispatchType} from "../utils/hooks/useAppDispatch";
import {AuthAPI} from "../dal/html.api";
import {setProfile} from "./profile.reducer";
import {setAppStatus} from "./app.reducer";
import {logoutRemoveData} from "../utils/logoutRemoveData";
import {writeAccessTokenInLS} from "../dal/acceesToken.api";
import {AppStatus} from "../models/AppStatus";
import {errorProcessing} from "../utils/errorProcessing/errorProcessing";
import {IUser} from "../models/IUser";

export type AuthActionsType = ReturnType<typeof setIsAuthing>
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setAuthId>
    | ReturnType<typeof setAuthUsername>
    | ReturnType<typeof setIsActivated>
    | ReturnType<typeof setAuthInitState>;

enum AuthAction {
    SET_IS_AUTHING = "SET_IS_AUTHING",
    SET_IS_AUTH = "SET_IS_AUTH",
    SET_AUTH_ID = "SET_AUTH_ID",
    SET_AUTH_USERNAME = "SET_AUTH_USERNAME",
    SET_IS_ACTIVATED = "SET_IS_ACTIVATED",
    SET_AUTH_INIT_STATE = "SET_AUTH_INIT_STATE",
}

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
        case AuthAction.SET_IS_AUTHING:
        case AuthAction.SET_IS_AUTH:
        case AuthAction.SET_AUTH_ID:
        case AuthAction.SET_AUTH_USERNAME:
        case AuthAction.SET_IS_ACTIVATED:
            return {...state, ...action.payload};
        case AuthAction.SET_AUTH_INIT_STATE:
            return {...authInitState};
        default:
            return state;
    }
};


const setIsAuthing = (isAuthing: boolean) => {
    return {
        type: AuthAction.SET_IS_AUTHING,
        payload: {isAuthing}
    } as const;
};
const setIsAuth = (isAuth: boolean) => {
    return {
        type: AuthAction.SET_IS_AUTH,
        payload: {isAuth}
    } as const;
};
const setAuthId = (authId: null | number) => {
    return {
        type: AuthAction.SET_AUTH_ID,
        payload: {authId}
    } as const;
};
const setAuthUsername = (authUsername: null | string) => {
    return {
        type: AuthAction.SET_AUTH_USERNAME,
        payload: {authUsername}
    } as const;
};
const setIsActivated = (isActivated: boolean) => {
    return {
        type: AuthAction.SET_IS_ACTIVATED,
        payload: {isActivated}
    } as const;
};
export const setAuthInitState = () => {
    return {
        type: AuthAction.SET_AUTH_INIT_STATE,
    } as const;
};

const setAuthUserData = (dispatch: ThunkDispatchType, user: IUser, accessToken: string) => {
    writeAccessTokenInLS(accessToken);

    // set data in authReducer
    dispatch(setIsAuth(true));
    dispatch(setAuthId(user.id));
    dispatch(setAuthUsername(user.username));
    dispatch(setIsActivated(user.isActivated));

    // set data in userReducer
    dispatch(setProfile(user));
};

export const signUpTC = (username: string, email: string, password: string) =>
    async (dispatch: ThunkDispatchType) => {
        try {
            dispatch(setAppStatus(AppStatus.REQUEST));
            dispatch(setIsAuthing(true));

            const response = await AuthAPI.signUp(username, email, password);

            setAuthUserData(dispatch, response.data.user, response.data.tokens.accessToken);

            dispatch(setIsAuthing(false));
            dispatch(setAppStatus(AppStatus.SUCCESS));

            return Promise.resolve(response.message);
        } catch (error) {
            const errorMessage = errorProcessing(error);

            dispatch(setIsAuthing(false));
            dispatch(setAppStatus(AppStatus.FAILED));

            return Promise.reject(errorMessage);
        }
    };

export const signInTC = (username: string, password: string) =>
    async (dispatch: ThunkDispatchType) => {
        try {
            dispatch(setAppStatus(AppStatus.REQUEST));
            dispatch(setIsAuthing(true));

            const response = await AuthAPI.signIn(username, password);

            setAuthUserData(dispatch, response.data.user, response.data.tokens.accessToken);

            dispatch(setIsAuthing(false));
            dispatch(setAppStatus(AppStatus.SUCCESS));

            return Promise.resolve(response.message);
        } catch (error) {
            const errorMessage = errorProcessing(error);

            dispatch(setIsAuthing(false));
            dispatch(setAppStatus(AppStatus.FAILED));
            return Promise.reject(errorMessage);
        }
    };

export const refreshTC = () =>
    async (dispatch: ThunkDispatchType) => {
        try {
            dispatch(setAppStatus(AppStatus.REQUEST));
            dispatch(setIsAuthing(true));

            const response = await AuthAPI.refresh();

            setAuthUserData(dispatch, response.data.user, response.data.tokens.accessToken);

            dispatch(setIsAuthing(false));
            dispatch(setAppStatus(AppStatus.SUCCESS));

            return Promise.resolve(response.message);
        } catch (error) {
            const errorMessage = errorProcessing(error);

            dispatch(setIsAuthing(false));
            dispatch(setAppStatus(AppStatus.FAILED));

            return Promise.reject(errorMessage);
        }
    };

export const logoutTC = () =>
    async (dispatch: ThunkDispatchType) => {
        try {

            dispatch(setAppStatus(AppStatus.REQUEST));
            dispatch(setIsAuthing(true));

            const response = await AuthAPI.logout();

            // utilFn for clear data in reducers to init values
            // includes fn for remove accessToken in LS
            logoutRemoveData(dispatch);

            dispatch(setIsAuthing(false));
            dispatch(setAppStatus(AppStatus.SUCCESS));

            return Promise.resolve(response.message);
        } catch (error) {
            const errorMessage = errorProcessing(error);

            dispatch(setIsAuthing(false));
            dispatch(setAppStatus(AppStatus.FAILED));
            return Promise.reject(errorMessage);
        }
    };