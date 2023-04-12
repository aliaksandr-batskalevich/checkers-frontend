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
        case "SET_PLAY_INIT_STATE":
            return {...playInitState};
        case 'SET_BOARD':
            return {...state, ...action.payload};
        case "SET_PLAY_TYPE":
            return {...state, ...action.payload};
        case "SET_LEVEL":
            return {...state, ...action.payload};
        case "SET_PLAY_ORDER":
            return {...state, ...action.payload};
        case "SET_SELECTED_CELL":
            return {...state, ...action.payload};
        case "SET_GAME_STATUS":
            return {...state, ...action.payload};
        case "SET_PLAY_COUNT":
            return {...state, ...action.payload};
        case "SET_WINNER":
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const setPlayInitState = () => {
    return {
        type: 'SET_PLAY_INIT_STATE'
    } as const;
};

export const setBoard = (board: Board) => {
    return {
        type: 'SET_BOARD',
        payload: {board}
    } as const;
};

export const setPlayType = (playType: PlayType) => {
    return {
        type: 'SET_PLAY_TYPE',
        payload: {playType}
    } as const;
};

export const setLevel = (level: number) => {
    return {
        type: 'SET_LEVEL',
        payload: {level}
    } as const;
};

export const setPlayOrder = (order: Colors) => {
    return {
        type: 'SET_PLAY_ORDER',
        payload: {order}
    } as const;
};

export const setSelectedCell = (selectedCell: Cell | null) => {
    return {
        type: 'SET_SELECTED_CELL',
        payload: {selectedCell}
    } as const;
};

export const setPlayStatus = (status: Status) => {
    return {
        type: 'SET_GAME_STATUS',
        payload: {status}
    } as const;
};

export const setPlayCount = (count: Array<number>) => {
    return {
        type: 'SET_PLAY_COUNT',
        payload: {count}
    } as const;
};

export const setWinner = (winner: null | Colors) => {
    return {
        type: 'SET_WINNER',
        payload: {winner}
    } as const;
};
