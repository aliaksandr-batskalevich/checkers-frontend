import React from 'react';
import s from './ChatMessages.module.scss';
import {ChatMessage} from "./ChatMessage/ChatMessage";
import {IChatMessage} from "../../../../../models/IChatMessage";
import {useScrollDown} from "../../../../../utils/hooks/useScrollDown";

type ChatMessagesPropsType = {
    authUsername: null | string
    chatMessages: Array<IChatMessage>
};

export const ChatMessages: React.FC<ChatMessagesPropsType> = ({authUsername, chatMessages}) => {

    const {ref} = useScrollDown(chatMessages)

    const messagesToRender = chatMessages.map(chatMessage => <ChatMessage
        key={chatMessage.id}
        authUsername={authUsername}
        {...chatMessage}/>);

    return (
        <div className={s.chatMessagesWrapper}>
            {messagesToRender}
            <div ref={ref}/>
        </div>
    );
};