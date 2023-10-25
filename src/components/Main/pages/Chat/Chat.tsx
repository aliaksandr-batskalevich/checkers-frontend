import React, {useEffect} from 'react';
import s from './Chat.module.scss';
import {ChatMessages} from "./Messages/ChatMessages";
import {Writer} from "./Writer/Writer";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../utils/hooks/useApDispatch";
import {
    addChatUserWithSound,
    removeChatUserWithSound,
    sendMessageTC,
    setIsChatSendSounds,
    startMessagingTC,
    stopMessagingTC
} from "../../../../bll/chat.reducer";
import incomingMessageSoundSrc from '../../../../assets/audio/incomingMessage.wav';
import sendMessageSoundSrc from '../../../../assets/audio/sentMessage.wav';
import UsersOnline from "./UsersOnline/UsersOnline";
import {IChatUser} from "../../../../models/IChatMessage";
import {getAuthUsername} from "../../../../bll/auth.selector";
import {
    getChatIsSendSounds,
    getChatMessages,
    getChatUsersOnline,
    getChatUsersWithSound
} from "../../../../bll/chat.selector";


export const Chat = () => {
    const dispatch = useAppDispatch();

    const authUsername = useSelector(getAuthUsername);
    const chatMessages = useSelector(getChatMessages);
    const chatUsersOnline = useSelector(getChatUsersOnline);
    const isSendSounds = useSelector(getChatIsSendSounds);
    const usersWithSound = useSelector(getChatUsersWithSound);


    const incomingMessageSound = new Audio(incomingMessageSoundSrc);
    incomingMessageSound.preload = 'auto';

    const sendMessageSound = new Audio(sendMessageSoundSrc);
    incomingMessageSound.preload = 'auto';


    const sendMessageHandler = (message: string) => {
        dispatch(sendMessageTC(message));
        isSendSounds && sendMessageSound.play();
    };

    const switchSendSoundHandler = (isSounds: boolean) => {
        dispatch(setIsChatSendSounds(isSounds));
    };

    const switchIncomingSoundsHandler = (isSounds: boolean, user: IChatUser) => {
        isSounds
            ? dispatch(addChatUserWithSound(user))
            : dispatch(removeChatUserWithSound(user));
    };


    // connect WS
    useEffect(() => {

        const subscriber = dispatch(startMessagingTC());

        return () => {
            dispatch(stopMessagingTC(subscriber));
        }
    }, [dispatch]);

    // incomingSounds
    useEffect(() => {
        const lastMessageAuthor = chatMessages.at(-1)?.author;
        const soundCondition = usersWithSound.find(user => user.username === lastMessageAuthor);

        soundCondition && incomingMessageSound.play();

    }, [chatMessages, dispatch]);

    return (
        <div className={s.chatWrapper}>
            <UsersOnline
                authUsername={authUsername!}
                chatUsersOnline={chatUsersOnline}
                usersWithSound={usersWithSound}
                switchIncomingSounds={switchIncomingSoundsHandler}
            />
            <ChatMessages authUsername={authUsername} chatMessages={chatMessages}/>
            <Writer
                isSendSounds={isSendSounds}
                switchSendSound={switchSendSoundHandler}
                sendMessage={sendMessageHandler}
            />
        </div>
    );
};