import {RootStateType} from "./store";
import {IGameItemType} from "../models/IGameItem";
import {IGameProgressType} from "../models/IGameProgress";


export const getIsGameInit = (state: RootStateType): boolean => state.game.isGameInit;
export const getIsGameFetching = (state: RootStateType): boolean => state.game.isFetching;
export const getGame = (state: RootStateType): IGameItemType | null => state.game.game;
export const getGameProgress = (state: RootStateType): IGameProgressType | null => state.game.progress;