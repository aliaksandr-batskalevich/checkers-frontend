import React, {useEffect} from 'react';
import s from './Chat.module.scss';
import {ChatMessages} from "./Messages/ChatMessages";
import {Writer} from "./Writer/Writer";
import {withAuthRedirect} from "../../../commons/HOCs/withAuthRedirect";
import {useSelector} from "react-redux";
import {getAuthUsername} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {authMessageMaker, chatMessageMaker} from "../../../../utils/wsUtils";
import {refreshTC} from "../../../../bll/auth.reducer";
import {IChatMessage} from "../../../../models/IChatMessage";
import {addChatMessages, setInitChatState} from "../../../../bll/chat.reducer";

const Chat = () => {
    const authUsername = useSelector(getAuthUsername);
    const dispatch = useAppDispatch();

    let socket: WebSocket;

    useEffect(() => {
        dispatch(refreshTC())
            .then(() => {
                socket = new WebSocket('ws://35.239.107.150/api/chat');

                socket.onopen = () => {
                    const authMessage = authMessageMaker();
                    socket.send(authMessage);
                };

                socket.onmessage = (event) => {
                    const messages = JSON.parse(event.data) as Array<IChatMessage>;
                    dispatch(addChatMessages(messages));
                };

                socket.onclose = () => {
                    dispatch(addSnackbarInfoMessage('You left the chat!'));
                    dispatch(setInitChatState());
                }

            });

        return () => {
            socket?.close();
            dispatch(setInitChatState());
        }
    }, [dispatch]);


    const sendMessageHandler = (message: string) => {
        const newMessage = chatMessageMaker(message);
        socket.send(newMessage);
    };

    return (
        <div className={s.chatWrapper}>
            <ChatMessages authUsername={authUsername} />
            <Writer sendMessage={sendMessageHandler} />
        </div>
    );
};

export default withAuthRedirect(Chat);