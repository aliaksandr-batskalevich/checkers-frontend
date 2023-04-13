import React, {useEffect} from 'react';
import s from './Chat.module.scss';
import {ChatMessages} from "./Messages/ChatMessages";
import {Writer} from "./Writer/Writer";
import {withAuthRedirect} from "../../../commons/HOCs/withAuthRedirect";
import {useSelector} from "react-redux";
import {getAuthUsername} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {sendMessageTC, startMessagingTC, stopMessagingTC} from "../../../../bll/chat.reducer";
import {addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";

const Chat = () => {
    const authUsername = useSelector(getAuthUsername);
    const dispatch = useAppDispatch();

    const sendMessageHandler = (message: string) => {
       dispatch(sendMessageTC(message));
    };

    useEffect(() => {

        const subscriber = dispatch(startMessagingTC());

        return () => {
            dispatch(stopMessagingTC(subscriber));
            dispatch(addSnackbarInfoMessage('You have left the chat!'))
        }
    }, [dispatch]);

    return (
        <div className={s.chatWrapper}>
            <ChatMessages authUsername={authUsername} />
            <Writer sendMessage={sendMessageHandler} />
        </div>
    );
};

export default withAuthRedirect(Chat);