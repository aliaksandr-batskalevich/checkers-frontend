import {IChatMessage, IChatObject, IChatUser} from "../models/IChatMessage";
import webSocketInstance, {WebSocketSubscriberType} from '../dal/ws.api';
import {ThunkDispatchType} from "../utils/hooks/useApDispatch";

export type ChatActionsType = ReturnType<typeof setInitChatState>
    | ReturnType<typeof setChatUsersOnline>
    | ReturnType<typeof setIsChatSendSounds>
    | ReturnType<typeof addChatUserWithSound>
    | ReturnType<typeof removeChatUserWithSound>
    | ReturnType<typeof resetChatData>
    | ReturnType<typeof addChatMessages>;

enum ChatAction {
    ADD_MESSAGE = "ADD_MESSAGE",
    SET_CHAT_USERS_ONLINE = "SET_CHAT_USERS_ONLINE",
    SET_IS_CHAT_SEND_SOUNDS = "SET_IS_CHAT_SEND_SOUNDS",
    SET_CHAT_USER_WITH_SOUND = "SET_CHAT_USER_WITH_SOUND",
    REMOVE_CHAT_USER_WITH_SOUND = "REMOVE_CHAT_USER_WITH_SOUND",
    RESET_CHAT_DATA = "RESET_CHAT_DATA",
    SET_INIT_CHAT_STATE = "SET_INIT_CHAT_STATE",
}

type ChatStateType = {
    chatMessages: Array<IChatMessage>
    usersOnline: Array<IChatUser>
    isSendSounds: boolean
    usersWithSound: Array<IChatUser>
};

const initChatState: ChatStateType = {
    chatMessages: [],
    usersOnline: [],
    isSendSounds: false,
    usersWithSound: [],
};

export const chatReducer = (state: ChatStateType = initChatState, action: ChatActionsType): ChatStateType => {
    switch (action.type) {
        case ChatAction.SET_CHAT_USERS_ONLINE:
        case ChatAction.SET_IS_CHAT_SEND_SOUNDS:
            return {...state, ...action.payload};
        case ChatAction.ADD_MESSAGE:
            return {...state, chatMessages: [...state.chatMessages, ...action.payload.chatMessages]};
        case ChatAction.SET_CHAT_USER_WITH_SOUND:
            return {...state, usersWithSound: [...state.usersWithSound, action.payload.userWithSound]};
        case ChatAction.REMOVE_CHAT_USER_WITH_SOUND:
            return {...state, usersWithSound: state.usersWithSound.filter(u => u.username !== action.payload.userWithoutSound.username)};
        case ChatAction.RESET_CHAT_DATA:
            return {...state, chatMessages: [], usersOnline: []};
        case ChatAction.SET_INIT_CHAT_STATE:
            return {...action.payload.initChatState};
        default:
            return state;
    }
};

export const addChatMessages = (chatMessages: Array<IChatMessage>) => {
    return {
        type: ChatAction.ADD_MESSAGE,
        payload: {chatMessages}
    } as const;
};

export const setChatUsersOnline = (usersOnline: Array<IChatUser>) => {
    return {
        type: ChatAction.SET_CHAT_USERS_ONLINE,
        payload: {usersOnline}
    } as const;
};

export const setIsChatSendSounds = (isSendSounds: boolean) => {
    return {
        type: ChatAction.SET_IS_CHAT_SEND_SOUNDS,
        payload: {isSendSounds}
    } as const;
};

export const addChatUserWithSound = (userWithSound: IChatUser) => {
    return {
        type: ChatAction.SET_CHAT_USER_WITH_SOUND,
        payload: {userWithSound}
    } as const;
};

export const removeChatUserWithSound = (userWithoutSound: IChatUser) => {
    return {
        type: ChatAction.REMOVE_CHAT_USER_WITH_SOUND,
        payload: {userWithoutSound}
    } as const;
};

export const resetChatData = () => {
    return {
        type: ChatAction.RESET_CHAT_DATA,
    } as const;
};

export const setInitChatState = () => {
    return {
        type: ChatAction.SET_INIT_CHAT_STATE,
        payload: {initChatState}
    } as const;
};


export const startMessagingTC = () => (dispatch: ThunkDispatchType) => {
    const subscriber = (chatObject: IChatObject) => {
        dispatch(addChatMessages(chatObject.messages));
        dispatch(setChatUsersOnline(chatObject.usersOnline));
    };

    webSocketInstance.startMessaging(dispatch, subscriber);

    return subscriber;
};

export const sendMessageTC = (message: string) => (dispatch: ThunkDispatchType) => {
    webSocketInstance.sendMessage(message);
};

export const stopMessagingTC = (subscriber: WebSocketSubscriberType) => (dispatch: ThunkDispatchType) => {
    webSocketInstance.stopMessaging(subscriber);
    dispatch(resetChatData());
};
