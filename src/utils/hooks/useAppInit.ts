import {useAppDispatch} from "./useApDispatch";
import {useEffect} from "react";
import {refreshTC} from "../../bll/auth.reducer";
import {setIsAppInit} from "../../bll/app.reducer";

export const useAppInit = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(refreshTC())
            .finally(() => {
                dispatch(setIsAppInit(true));
            });

    }, [dispatch]);

}