import React, {useEffect} from 'react';
import s from './ActivateMessage.module.scss';
import {useAppDispatch} from "../../utils/hooks";
import {addSnackbarWarningMessage} from "../../bll/snackbar.reducer";


export const ActivateMessage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(addSnackbarWarningMessage('Your account is not activated!'));
    }, [dispatch]);

    return (
        <div className={s.messageWrapper}>
            <h2>Activate your account via email!</h2>
        </div>
    );
};