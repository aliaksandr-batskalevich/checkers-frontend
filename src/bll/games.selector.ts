import {RootStateType} from "./store";
import {GamesFilterType} from "./games.reducer";
import {IGameItemType} from "../models/IGameItem";


export const getIsGamesFilterInit = (state: RootStateType): boolean => state.games.isGamesFilterInit;
export const getIsGamesFetching = (state: RootStateType): boolean => state.games.isGamesFetching;
export const getIsNewGameCreating = (state: RootStateType): boolean => state.games.isNewGameCreating;
export const getGamesFilter = (state: RootStateType): GamesFilterType => state.games.gamesFilter;
export const getGameItems = (state: RootStateType): Array<IGameItemType> => state.games.gameItems;
export const getGamesCurrentPage = (state: RootStateType): number => state.games.currentPage;
export const getGamesTotalPageCount = (state: RootStateType): number => state.games.totalPageCount;
export const getGameItemsCountOnPage = (state: RootStateType): number => state.games.itemsCountOnPage;