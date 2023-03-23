import {ThunkDispatchType} from "./hooks";
import {removeAccessTokenInLS} from "./acceesTokenLS";
import {setAuthInitState} from "../bll/auth.reducer";
import {setProfileInitState} from "../bll/profile.reducer";
import {setUsersInitSate} from "../bll/users.reducer";

export const logoutRemoveData = (dispatch: ThunkDispatchType) => {
    removeAccessTokenInLS();
    dispatch(setAuthInitState());
    dispatch(setProfileInitState());
    dispatch(setUsersInitSate());
};