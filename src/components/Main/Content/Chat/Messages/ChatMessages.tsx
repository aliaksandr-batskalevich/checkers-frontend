import React from 'react';
import s from './ChatMessages.module.scss';
import {ChatMessage} from "./ChatMessage/ChatMessage";
import {useSelector} from "react-redux";
import {getChatMessages} from "../../../../../bll/selectors";

type ChatMessagesPropsType = {
  authUsername: null | string
};

export const ChatMessages: React.FC<ChatMessagesPropsType> = ({authUsername}) => {

    const chatMessages = useSelector(getChatMessages);

    const messagesToRender = chatMessages.map(chatMessage => <ChatMessage
        key={chatMessage.id}
        authUsername={authUsername}
        {...chatMessage}/>);

    return (
        <div className={s.chatMessagesWrapper}>
            <div className={s.messagesContainer}>
                {messagesToRender}
            </div>
        </div>
    );
};