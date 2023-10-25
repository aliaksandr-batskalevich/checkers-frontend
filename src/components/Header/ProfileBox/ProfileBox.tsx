import React from 'react';
import s from "./ProfileBox.module.scss";
import {useSelector} from "react-redux";
import {getAuthUsername, getIsAuthing} from "../../../bll/auth.selector";
import {useAppDispatch} from "../../../utils/hooks/useApDispatch";
import {useNavigate} from "react-router-dom";
import {logoutTC} from "../../../bll/auth.reducer";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../bll/snackbar.reducer";

export const ProfileBox = () => {
    const isAuthing = useSelector(getIsAuthing);
    const username = useSelector(getAuthUsername);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutTC())
            .then((message) => {
                navigate('/signin');
                dispatch(addSnackbarInfoMessage(message));
            })
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

    return (
        <div className={s.profileBox}>
            <h3>{username}</h3>
            <button disabled={isAuthing} onClick={logout}>logout</button>
        </div>
    );
};