import React, {useEffect} from 'react';
import s from './TopUsers.module.scss';
import {useSelector} from "react-redux";
import {getIsTopUsersFetching, getTopUsers} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {getTopUsersTC, setTopUsersInitSate} from "../../../../bll/top.reducer";
import {addSnackbarErrorMessage} from "../../../../bll/snackbar.reducer";
import {Preloader} from "../../../commons/Preloader/Preloader";
import {TopUser} from "./TopUser/TopUser";
import {useNavigate} from "react-router-dom";

export const TopUsers = () => {
    const isTopUsersFetching = useSelector(getIsTopUsersFetching);
    const topUsers = useSelector(getTopUsers);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTopUsersTC(10))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });

        return () => {
            dispatch(setTopUsersInitSate());
        }
    }, [dispatch]);

    const viewProfileHandler = (id: number) => {
        navigate(`/profile/${id}`);
    };

    const topUsersToRender = topUsers.map((topUser, index) => <TopUser key={topUser.id} position={index + 1}
                                                                       viewProfile={viewProfileHandler} {...topUser}/>);

    return (
        isTopUsersFetching
            ? <Preloader/>
            : <div className={s.topUsersWrapper}>
                <h2>USERS TOP 10</h2>
                <div className={s.header}>
                    <div>position</div>
                    <div>username</div>
                    <div>rating</div>
                </div>
                {topUsersToRender}
            </div>
    );
};