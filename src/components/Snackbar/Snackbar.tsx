import React from 'react';
import s from './Snackbar.module.scss';
import {Message} from "./Message/Message";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../utils/hooks/useAppDispatch";
import {removeSnackbarMessage} from "../../bll/snackbar.reducer";
import {getSnackbarMessages} from "../../bll/snackbar.selector";

export const Snackbar = () => {
    let snackbarMessages = useSelector(getSnackbarMessages);
    const dispatch = useAppDispatch();
    const removeSnackbarMessageHandler = (id: string) => {
        dispatch(removeSnackbarMessage(id));
    };

    let snackbarMessagesToRender = snackbarMessages.map(m => <Message key={m.id} id={m.id} type={m.type} text={m.text} closeMessage={removeSnackbarMessageHandler}/>);

    return (
        <div className={s.snackbarWrapper}>
            {snackbarMessagesToRender}
        </div>
    );
};