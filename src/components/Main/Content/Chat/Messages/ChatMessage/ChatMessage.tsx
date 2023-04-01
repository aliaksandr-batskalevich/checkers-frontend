import React from 'react';
import s from './ChatMessage.module.scss';
import {IChatMessage} from "../../../../../../models/IChatMessage";

export const ChatMessage: React.FC<IChatMessage & { authUsername: string | null }> = ({
                                                                                          author,
                                                                                          message,
                                                                                          date,
                                                                                          authUsername
                                                                                      }) => {

    const authUserMessageStyle = authUsername === author
        ? {border: 'red solid 1px'}
        : undefined;

    const time = new Date(date).toLocaleTimeString();

    return (author === 'admin'
            ? <div className={s.adminMessageWrapper}>
                    <span>{message}</span>
                    <span className={s.aminMessageTime}>{time}</span>
            </div>
            : <div className={s.chatMessageWrapper}>
                <div className={s.authorWrapper}>
                    <div className={s.author}>{author}</div>
                    <div className={s.time}>{time}</div>
                </div>
                <div className={s.message} style={authUserMessageStyle}>{message}</div>
            </div>
    );
};