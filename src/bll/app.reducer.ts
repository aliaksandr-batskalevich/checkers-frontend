import {resolveTxt} from "dns";

export type AppActionsType = ReturnType<typeof setAppStatus>
    | ReturnType<typeof setIsAppInit>;

export enum AppStatus {
    INIT = 'init',
    REQUEST = 'request',
    SUCCESS = 'success',
    FAILED = 'failed',
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
        case "SET_IS_APP_INIT":
            return {...state, ...action.payload};
        case "SET_APP_STATUS":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setIsAppInit = (isAppInit: boolean) => {
    return {
        type: 'SET_IS_APP_INIT',
        payload: {isAppInit}
    } as const;
};

export const setAppStatus = (status: AppStatus) => {
    return {
        type: 'SET_APP_STATUS',
        payload: {status}
    } as const;
};