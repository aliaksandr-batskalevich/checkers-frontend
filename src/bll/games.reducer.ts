import {IGameItemType} from "../models/IGameItem";
import {ThunkDispatchType} from "../utils/hooks";
import {AppStatus, setAppStatus} from "./app.reducer";
import {GamesAPI} from "../dal/html.api";
import axios from "axios";
import {logoutRemoveData} from "../utils/logoutRemoveData";
import {Board} from "../models/game/Board";
import {Colors} from "../models/game/Colors";

export type GamesActionsType = ReturnType<typeof setIsGamesFilterInit>
    |ReturnType<typeof setIsGamesFetching>
    | ReturnType<typeof setIsNewGameCreating>
    | ReturnType<typeof setGamesInitState>
    | ReturnType<typeof setGamesFilter>
    | ReturnType<typeof setGamesCurrentPage>
    | ReturnType<typeof setGamesTotalPageCount>
    | ReturnType<typeof setGameItems>;

export enum GamesFilterType {
    ALL = 'all',
    PROGRESS = 'progress',
    COMPLETED = 'completed',
    SUCCESSFUL = 'successful'
}

type GamesStateType = {
    isGamesFilterInit: boolean
    isGamesFetching: boolean
    isNewGameCreating: boolean
    gamesFilter: GamesFilterType
    gameItems: Array<IGameItemType>
    currentPage: number,
    itemsCountOnPage: number,
    totalPageCount: number,
};

const gamesInitState: GamesStateType = {
    isGamesFilterInit: false,
    isGamesFetching: false,
    isNewGameCreating: false,
    gamesFilter: GamesFilterType.ALL,
    gameItems: [],
    currentPage: 1,
    itemsCountOnPage: 4,
    totalPageCount: 0,
};


export const gamesReducer = (state: GamesStateType = gamesInitState, action: GamesActionsType): GamesStateType => {
    switch (action.type) {
        case "SET_IS_GAMES_FILTER_INIT":
            return {...state, ...action.payload};
        case "SET_IS_GAMES_FETCHING":
            return {...state, ...action.payload};
        case "SET_IS_NEW_GAME_CREATING":
            return {...state, ...action.payload};
        case "SET_GAMES_INIT_STATE":
            return {...gamesInitState};
        case "SET_GAMES_FILTER":
            return {...state, ...action.payload};
        case "SET_GAMES_CURRENT_PAGE":
            return {...state, ...action.payload};
        case "SET_GAMES_TOTAL_PAGE_COUNT":
            return {...state, ...action.payload};
        case "SET_GAME_ITEMS":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setIsGamesFilterInit = (isGamesFilterInit: boolean) => {
    return {
        type: 'SET_IS_GAMES_FILTER_INIT',
        payload: {isGamesFilterInit}
    } as const;
};

const setIsGamesFetching = (isGamesFetching: boolean) => {
    return {
        type: 'SET_IS_GAMES_FETCHING',
        payload: {isGamesFetching}
    } as const;
};

const setIsNewGameCreating = (isNewGameCreating: boolean) => {
    return {
        type: 'SET_IS_NEW_GAME_CREATING',
        payload: {isNewGameCreating}
    } as const;
};

export const setGamesInitState = () => {
    return {
        type: 'SET_GAMES_INIT_STATE'
    } as const;
};

export const setGamesFilter = (gamesFilter: GamesFilterType) => {
    return {
        type: 'SET_GAMES_FILTER',
        payload: {gamesFilter}
    } as const;
};

export const setGamesCurrentPage = (currentPage: number) => {
    return {
        type: 'SET_GAMES_CURRENT_PAGE',
        payload: {currentPage}
    } as const;
};

const setGamesTotalPageCount = (totalPageCount: number) => {
    return {
        type: 'SET_GAMES_TOTAL_PAGE_COUNT',
        payload: {totalPageCount}
    } as const;
};

const setGameItems = (gameItems: Array<IGameItemType>) => {
    return {
        type: 'SET_GAME_ITEMS',
        payload: {gameItems}
    } as const;
};

export const createGameTC = (level: number, currentOrder: Colors) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsNewGameCreating(true));

        const createdBoard = new Board();
        createdBoard.initCells();
        createdBoard.addFigures();
        const exportsCellFigures = createdBoard.exportFigures();
        const figuresJSON = JSON.stringify(exportsCellFigures);

        const response = await GamesAPI.createGame(level, currentOrder, figuresJSON);

        dispatch(setAppStatus(AppStatus.SUCCESS));
        dispatch(setIsNewGameCreating(false));

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
        dispatch(setIsNewGameCreating(false));

        return Promise.reject(errorMessage);
    }
};

export const getGamesTC = (filter: GamesFilterType, count: number, page: number) => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(setAppStatus(AppStatus.REQUEST));
        dispatch(setIsGamesFetching(true));

        const response = await GamesAPI.getGames(filter, count, page);
        const {totalCount, games} = response.data;
        const totalPageCount = Math.ceil(totalCount / count);

        dispatch(setGameItems(games));
        dispatch(setGamesTotalPageCount(totalPageCount));

        dispatch(setAppStatus(AppStatus.SUCCESS));
        dispatch(setIsGamesFilterInit(true));
        dispatch(setIsGamesFetching(false));

        return Promise.resolve(response.message);
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
        dispatch(setIsGamesFetching(false));

        return Promise.reject(errorMessage);
    }
}
