import {combineReducers, legacy_createStore, applyMiddleware} from "redux";
import {AppActionsType, appReducer} from "./app.reducer";
import thunkMiddleware from 'redux-thunk';
import {AuthActionsType, authReducer} from "./auth.reducer";
import {ProfileActionsType, profileReducer} from "./profile.reducer";
import {SnackbarActionsType, snackbarReducer} from "./snackbar.reducer";
import {UsersActionsType, usersReducer} from "./users.reducer";

export type RootActionsType = AppActionsType | AuthActionsType | ProfileActionsType | SnackbarActionsType | UsersActionsType;
export type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    snackbar: snackbarReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
