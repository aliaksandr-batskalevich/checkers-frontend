import React from 'react';
import s from './ChatMessages.module.scss';
import {ChatMessage} from "./ChatMessage/ChatMessage";
import {IChatMessage, IChatUser} from "../../../../../models/IChatMessage";

type ChatMessagesPropsType = {
    authUsername: null | string
    chatMessages: Array<IChatMessage>
};

export const ChatMessages: React.FC<ChatMessagesPropsType> = ({authUsername, chatMessages}) => {

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