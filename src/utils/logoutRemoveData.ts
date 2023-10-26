import {ThunkDispatchType} from "./hooks/useAppDispatch";
import {removeAccessTokenInLS} from "../dal/acceesToken.api";
import {setAuthInitState} from "../bll/auth.reducer";
import {setProfileInitState} from "../bll/profile.reducer";
import {setUsersInitSate} from "../bll/users.reducer";
import {setGamesInitState} from "../bll/games.reducer";
import {setGameInitState} from "../bll/game.reducer";
import {setPlayInitState} from "../bll/play.reducer";

export const logoutRemoveData = (dispatch: ThunkDispatchType) => {
    removeAccessTokenInLS();
    dispatch(setAuthInitState());
    dispatch(setProfileInitState());
    dispatch(setUsersInitSate());
    dispatch(setGamesInitState());
    dispatch(setGameInitState());
    dispatch(setPlayInitState());
};