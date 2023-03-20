import {combineReducers, legacy_createStore, applyMiddleware} from "redux";
import {AppActionsType, appReducer} from "./app.reducer";
import thunkMiddleware from 'redux-thunk';
import {AuthActionsType, authReducer} from "./auth.reducer";
import {ProfileActionsType, profileReducer} from "./profile.reducer";

export type RootActionsType = AppActionsType | AuthActionsType | ProfileActionsType;
export type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
