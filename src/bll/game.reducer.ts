import {IGameItemType} from "../models/IGameItem";
import {IGameProgressType} from "../models/IGameProgress";
import {ThunkDispatchType} from "../utils/hooks/useApDispatch";
import {setAppStatus} from "./app.reducer";
import {GamesAPI} from "../dal/html.api";
import axios from "axios";
import {logoutRemoveData} from "../utils/logoutRemoveData";
import {CellFigureExportType} from "../models/game/CellFigureExportType";
import {AppStatus} from "../models/AppStatus";

export type GameActionsType = ReturnType<typeof setIsGameInit>
    | ReturnType<typeof setIsGameFetching>
    | ReturnType<typeof setGame>
    | ReturnType<typeof setGameProgress>
    | ReturnType<typeof setGameInitState>;

enum GameAction {
    SET_IS_GAME_INIT = "SET_IS_GAME_INIT",
    SET_IS_GAME_FETCHING = "SET_IS_GAME_FETCHING",
    SET_GAME = "SET_GAME",
    SET_GAME_PROGRESS = "SET_GAME_PROGRESS",
    SET_GAME_INIT_STATE = "SET_GAME_INIT_STATE",
}

type GameStateType = {
    isGameInit: boolean
    isFetching: boolean
    game: IGameItemType | null
    progress: IGameProgressType | null
};

const gameInitState: GameStateType = {
    isGameInit: false,
    isFetching: false,
    game: null,
    progress: null,
};


export const gameReducer = (state: GameStateType = gameInitState, action: GameActionsType): GameStateType => {
    switch (action.type) {
        case GameAction.SET_IS_GAME_INIT:
        case GameAction.SET_IS_GAME_FETCHING:
        case GameAction.SET_GAME:
        case GameAction.SET_GAME_PROGRESS:
            return {...state, ...action.payload};
        case GameAction.SET_GAME_INIT_STATE:
            return {...gameInitState};
        default:
            return state;
    }
}

const setIsGameInit = (isGameInit: boolean) => {
    return {
        type: GameAction.SET_IS_GAME_INIT,
        payload: {isGameInit}
    } as const;
};

const setIsGameFetching = (isFetching: boolean) => {
    return {
        type: GameAction.SET_IS_GAME_FETCHING,
        payload: {isFetching}
    } as const;
};

const setGame = (game: IGameItemType) => {
    return {
        type: GameAction.SET_GAME,
        payload: {game}
    } as const;
};

const setGameProgress = (progress: IGameProgressType) => {
    return {
        type: GameAction.SET_GAME_PROGRESS,
        payload: {progress}
    } as const;
};

export const setGameInitState = () => {
    return {
        type: GameAction.SET_GAME_INIT_STATE,
    } as const;
};

export const getGameTC = (gameId: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsGameFetching(true));

        const response = await GamesAPI.getGame(gameId);

        dispatch(setGame(response.data.game));
        dispatch(setGameProgress(response.data.progress));
        dispatch(setIsGameInit(true));

        dispatch(setAppStatus(AppStatus.SUCCESS));
        dispatch(setIsGameFetching(false));
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
        dispatch(setIsGameFetching(false));

        return Promise.reject(errorMessage);
    }
}

export const updateGameTC = (gameId: number, exportsCellFigures: Array<CellFigureExportType>) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsGameFetching(true));

        const figuresJSON = JSON.stringify(exportsCellFigures);

        const response = await GamesAPI.updateGame(gameId, figuresJSON);

        dispatch(setAppStatus(AppStatus.SUCCESS));
        dispatch(setIsGameFetching(false));

        return Promise.resolve(response);
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
        dispatch(setIsGameFetching(false));

        return Promise.reject(errorMessage);
    }
};

export const finishGameTC = (gameId: number, isWon: boolean) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsGameFetching(true));

        const response = await GamesAPI.finishGame(gameId, isWon);

        dispatch(setAppStatus(AppStatus.SUCCESS));
        dispatch(setIsGameFetching(false));

        return Promise.resolve(response);
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
        dispatch(setIsGameFetching(false));

        return Promise.reject(errorMessage);
    }
}