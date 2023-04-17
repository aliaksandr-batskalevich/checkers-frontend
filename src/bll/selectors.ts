import {createSelector} from "reselect";
import {RootStateType} from "./store";
import {ITopUser, IUser} from "../models/IUser";
import {SnackbarMessageType} from "./snackbar.reducer";
import {IChatMessage, IChatUser} from "../models/IChatMessage";
import {GamesFilterType} from "./games.reducer";
import {IGameItemType} from "../models/IGameItem";
import {IGameProgressType} from "../models/IGameProgress";
import {Status} from "../models/game/GameStatus";
import {Cell} from "../models/game/Cell";
import {Board} from "../models/game/Board";
import {PlayType} from "../models/game/PlayType";
import {Colors} from "../models/game/Colors";

// app
export const getIsAppInit = (state: RootStateType): boolean => state.app.isAppInit;

// auth
export const getIsAuthing = (state: RootStateType): boolean => state.auth.isAuthing;
export const getIsAuth = (state: RootStateType): boolean => state.auth.isAuth;
export const getAuthId = (state: RootStateType): null | number => state.auth.authId;
export const getAuthUsername = (state: RootStateType): null | string => state.auth.authUsername;
export const getIsActivated = (state: RootStateType): boolean => state.auth.isActivated;

// profile
export const getIsProfileFetching = (state: RootStateType): boolean => state.profile.isProfileFetching;
export const getProfile = (state: RootStateType): null | IUser => state.profile.profile;

// users
export const getIsUsersFetching = (state: RootStateType): boolean => state.users.isUsersFetching;
export const getUsersCurrentPage = (state: RootStateType): number => state.users.currentPage;
export const getUsersCountOnPage = (state: RootStateType): number => state.users.countOnPage;
export const getUsersTotalPageCount = (state: RootStateType): number => state.users.totalPageCount;
export const getUsers = (state: RootStateType): Array<IUser> => state.users.users;

// topUsers
export const getIsTopUsersFetching = (state: RootStateType): boolean => state.topUsers.isTopUsersFetching;
const getTopFullUsers = (state: RootStateType): Array<IUser> => state.topUsers.topUsers;
export const getTopUsers = createSelector(getTopFullUsers, (topFullUsers: Array<IUser>): Array<ITopUser> => topFullUsers.map(user => {
    const {id, username, rating} = user;
    return {id, username, rating};
}));

// games
export const getIsGamesFilterInit = (state: RootStateType): boolean => state.games.isGamesFilterInit;
export const getIsGamesFetching = (state: RootStateType): boolean => state.games.isGamesFetching;
export const getIsNewGameCreating = (state: RootStateType): boolean => state.games.isNewGameCreating;
export const getGamesFilter = (state: RootStateType): GamesFilterType => state.games.gamesFilter;
export const getGameItems = (state: RootStateType): Array<IGameItemType> => state.games.gameItems;
export const getGamesCurrentPage = (state: RootStateType): number => state.games.currentPage;
export const getGamesTotalPageCount = (state: RootStateType): number => state.games.totalPageCount;
export const getGameItemsCountOnPage = (state: RootStateType): number => state.games.itemsCountOnPage;

// game
export const getIsGameInit = (state: RootStateType): boolean => state.game.isGameInit;
export const getIsGameFetching = (state: RootStateType): boolean => state.game.isFetching;
export const getGame = (state: RootStateType): IGameItemType | null => state.game.game;
export const getGameProgress = (state: RootStateType): IGameProgressType | null => state.game.progress;

// play
export const getBoard = (state: RootStateType): Board => state.play.board;
export const getPlayType = (state: RootStateType): null | PlayType => state.play.playType;
export const getPlayLevel = (state: RootStateType): null | number => state.play.level;
export const getPlayOrder = (state: RootStateType): null | Colors => state.play.order;
export const getSelectedCell = (state: RootStateType): null | Cell => state.play.selectedCell;
export const getPlayStatus = (state: RootStateType): null | Status => state.play.status;
export const getPlayCount = (state: RootStateType): Array<number> => state.play.count;
export const getPlayWinner = (state: RootStateType): null | Colors => state.play.winner;
export const getForwards = createSelector(getBoard, (board: Board): Array<Cell> => board.getAllCells().filter(cell => cell.isForward));

// chat
export const getChatMessages = (state: RootStateType): Array<IChatMessage> => state.chat.chatMessages;
export const getChatUsersOnline = (state: RootStateType): Array<IChatUser> => state.chat.usersOnline;
export const getChatIsSendSounds = (state: RootStateType): boolean => state.chat.isSendSounds;
export const getChatUsersWithSound = (state: RootStateType): Array<IChatUser> => state.chat.usersWithSound;

// snackbar
export const getSnackbarMessages = (state: RootStateType): Array<SnackbarMessageType> => state.snackbar.snackbarMessages;
