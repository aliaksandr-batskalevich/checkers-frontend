import {useEffect} from "react";
import {getTopUsersTC, setTopUsersInitSate} from "../../bll/top.reducer";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../bll/snackbar.reducer";
import {useAppDispatch} from "./useAppDispatch";
import {useSelector} from "react-redux";
import {getAuthId} from "../../bll/auth.selector";
import {getIsTopUsersFetching, getTopUsers} from "../../bll/top.selector";

export const useTopUsersFetching = () => {

    const authId = useSelector(getAuthId);
    const isTopUsersFetching = useSelector(getIsTopUsersFetching);
    const topUsers = useSelector(getTopUsers);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTopUsersTC(10))
            .then(topUsers => {
                const authUserIndex = topUsers.findIndex(user => user.id === authId);
                const message = authUserIndex > -1
                    ? `Your position on the dashboard - ${authUserIndex + 1!}`
                    : `You are not in the top 10 players`;
                dispatch(addSnackbarInfoMessage(message));
            })
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });

        return () => {
            dispatch(setTopUsersInitSate());
        };
    }, [authId, dispatch]);

    return {isTopUsersFetching, topUsers, authId};
};