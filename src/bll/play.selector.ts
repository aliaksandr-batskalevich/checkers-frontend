import {createSelector} from "reselect";
import {RootStateType} from "./store";
import {Status} from "../models/game/GameStatus";
import {Cell} from "../models/game/Cell";
import {Board} from "../models/game/Board";
import {PlayType} from "../models/game/PlayType";
import {Colors} from "../models/game/Colors";


export const getBoard = (state: RootStateType): Board => state.play.board;
export const getPlayType = (state: RootStateType): null | PlayType => state.play.playType;
export const getPlayLevel = (state: RootStateType): null | number => state.play.level;
export const getPlayOrder = (state: RootStateType): null | Colors => state.play.order;
export const getSelectedCell = (state: RootStateType): null | Cell => state.play.selectedCell;
export const getPlayStatus = (state: RootStateType): null | Status => state.play.status;
export const getPlayCount = (state: RootStateType): Array<number> => state.play.count;
export const getPlayWinner = (state: RootStateType): null | Colors => state.play.winner;

// SELECTORS BY RESELECT
export const getForwards = createSelector(getBoard, (board: Board): Array<Cell> => board.getAllCells().filter(cell => cell.isForward));