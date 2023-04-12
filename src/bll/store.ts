import {combineReducers, legacy_createStore, applyMiddleware} from "redux";
import {AppActionsType, appReducer} from "./app.reducer";
import thunkMiddleware from 'redux-thunk';
import {AuthActionsType, authReducer} from "./auth.reducer";
import {ProfileActionsType, profileReducer} from "./profile.reducer";
import {SnackbarActionsType, snackbarReducer} from "./snackbar.reducer";
import {UsersActionsType, usersReducer} from "./users.reducer";
import {TopUsersActionsType, topUsersReducer} from "./top.reducer";
import {ChatActionsType, chatReducer} from "./chat.reducer";
import {GamesActionsType, gamesReducer} from "./games.reducer";
import {GameActionsType, gameReducer} from "./game.reducer";
import {PlayActionsType, playReducer} from "./play.reducer";

export type RootActionsType = AppActionsType | AuthActionsType | ProfileActionsType | SnackbarActionsType | UsersActionsType | TopUsersActionsType | GamesActionsType | GameActionsType | PlayActionsType | ChatActionsType;
export type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    topUsers: topUsersReducer,
    games: gamesReducer,
    game: gameReducer,
    play: playReducer,
    chat: chatReducer,
    snackbar: snackbarReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.appStore = store;
