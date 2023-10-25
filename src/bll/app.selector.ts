import {RootStateType} from "./store";

export const getIsAppInit = (state: RootStateType): boolean => state.app.isAppInit;