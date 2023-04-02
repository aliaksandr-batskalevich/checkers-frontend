import React from 'react';
import s from './ChatMessages.module.scss';
import {ChatMessage} from "./ChatMessage/ChatMessage";
import {useSelector} from "react-redux";
import {getChatMessages, getChatUsersOnline} from "../../../../../bll/selectors";

type ChatMessagesPropsType = {
  authUsername: null | string
};

export const ChatMessages: React.FC<ChatMessagesPropsType> = ({authUsername}) => {

    const chatMessages = useSelector(getChatMessages);
    const chatUsersOnline = useSelector(getChatUsersOnline);

    const messagesToRender = chatMessages.map(chatMessage => <ChatMessage
        key={chatMessage.id}
        authUsername={authUsername}
        {...chatMessage}/>);

    console.log(chatUsersOnline);
    const usersOnlineToRender = chatUsersOnline.map(user => <div key={user.userId} className={s.user}>{user.username}</div>);

    return (
        <div className={s.chatMessagesWrapper}>
            <div className={s.usersOnlineContainer}>
                <h3 className={s.title}>Users ONLINE:</h3>
                {usersOnlineToRender}
            </div>
            <div className={s.messagesContainer}>
                {messagesToRender}
            </div>
        </div>
    );
};