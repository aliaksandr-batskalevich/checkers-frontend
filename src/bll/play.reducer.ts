import {PlayType} from "../models/game/PlayType";
import {Colors} from "../models/game/Colors";
import {Status} from "../models/game/GameStatus";
import {Cell} from "../models/game/Cell";
import {Board} from "../models/game/Board";

export type PlayActionsType = ReturnType<typeof setPlayInitState>
    | ReturnType<typeof setBoard>
    | ReturnType<typeof setPlayType>
    | ReturnType<typeof setLevel>
    | ReturnType<typeof setPlayOrder>
    | ReturnType<typeof setSelectedCell>
    | ReturnType<typeof setPlayStatus>
    | ReturnType<typeof setPlayCount>
    | ReturnType<typeof setWinner>;

enum PlayAction {
    SET_PLAY_INIT_STATE = "SET_PLAY_INIT_STATE",
    SET_BOARD = "SET_BOARD",
    SET_PLAY_TYPE = "SET_PLAY_TYPE",
    SET_LEVEL = "SET_LEVEL",
    SET_PLAY_ORDER = "SET_PLAY_ORDER",
    SET_SELECTED_CELL = "SET_SELECTED_CELL",
    SET_GAME_STATUS = "SET_GAME_STATUS",
    SET_PLAY_COUNT = "SET_PLAY_COUNT",
    SET_WINNER = "SET_WINNER",

}

export type PlayStateType = {
    board: Board
    playType: PlayType | null
    level: number | null
    order: Colors | null
    selectedCell: Cell | null
    status: Status | null
    count: Array<number>
    winner: Colors | null
};

const playInitState: PlayStateType = {
    board: new Board(),
    playType: null,
    level: null,
    order: null,
    selectedCell: null,
    status: null,
    count: [12, 12],
    winner: null,
};


export const playReducer = (state: PlayStateType = playInitState, action: PlayActionsType): PlayStateType => {
    switch (action.type) {
        case PlayAction.SET_BOARD:
        case PlayAction.SET_PLAY_TYPE:
        case PlayAction.SET_LEVEL:
        case PlayAction.SET_PLAY_ORDER:
        case PlayAction.SET_SELECTED_CELL:
        case PlayAction.SET_GAME_STATUS:
        case PlayAction.SET_PLAY_COUNT:
        case PlayAction.SET_WINNER:
            return {...state, ...action.payload};
        case PlayAction.SET_PLAY_INIT_STATE:
            return {...playInitState};
        default:
            return state;
    }
}

export const setPlayInitState = () => {
    return {
        type: PlayAction.SET_PLAY_INIT_STATE,
    } as const;
};

export const setBoard = (board: Board) => {
    return {
        type: PlayAction.SET_BOARD,
        payload: {board}
    } as const;
};

export const setPlayType = (playType: PlayType) => {
    return {
        type: PlayAction.SET_PLAY_TYPE,
        payload: {playType}
    } as const;
};

export const setLevel = (level: number) => {
    return {
        type: PlayAction.SET_LEVEL,
        payload: {level}
    } as const;
};

export const setPlayOrder = (order: Colors) => {
    return {
        type: PlayAction.SET_PLAY_ORDER,
        payload: {order}
    } as const;
};

export const setSelectedCell = (selectedCell: Cell | null) => {
    return {
        type: PlayAction.SET_SELECTED_CELL,
        payload: {selectedCell}
    } as const;
};

export const setPlayStatus = (status: Status) => {
    return {
        type: PlayAction.SET_GAME_STATUS,
        payload: {status}
    } as const;
};

export const setPlayCount = (count: Array<number>) => {
    return {
        type: PlayAction.SET_PLAY_COUNT,
        payload: {count}
    } as const;
};

export const setWinner = (winner: null | Colors) => {
    return {
        type: PlayAction.SET_WINNER,
        payload: {winner}
    } as const;
};
