import {AppStatus} from "../models/AppStatus";

export type AppActionsType = ReturnType<typeof setAppStatus>
    | ReturnType<typeof setIsAppInit>;

enum AppAction {
    SET_IS_APP_INIT = "SET_IS_APP_INIT",
    SET_APP_STATUS = "SET_APP_STATUS",
}


type AppStateType = {
    isAppInit: boolean
    status: AppStatus
};

const appInitState: AppStateType = {
    isAppInit: false,
    status: AppStatus.INIT
};

export const appReducer = (state: AppStateType = appInitState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case AppAction.SET_IS_APP_INIT:
        case AppAction.SET_APP_STATUS:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setIsAppInit = (isAppInit: boolean) => {
    return {
        type: AppAction.SET_IS_APP_INIT,
        payload: {isAppInit}
    } as const;
};

export const setAppStatus = (status: AppStatus) => {
    return {
        type: AppAction.SET_APP_STATUS,
        payload: {status}
    } as const;
};