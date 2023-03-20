export type AppActionsType = ReturnType<typeof setAppStatus>;

export enum AppStatus {
    INIT = 'init',
    REQUEST = 'request',
    SUCCESS = 'success',
    FAILED = 'failed',
}

type AppStateType = {
    status: AppStatus
};

const appInitState: AppStateType = {
    status: AppStatus.INIT
};

export const appReducer = (state: AppStateType = appInitState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case "SET_APP_STATUS":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setAppStatus = (status: AppStatus) => {
    return {
        type: 'SET_APP_STATUS',
        payload: {status}
    } as const;
};