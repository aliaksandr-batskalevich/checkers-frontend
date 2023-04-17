import {IChatMessage, IChatObject, IChatUser} from "../models/IChatMessage";
import webSocketInstance, {WebSocketSubscriberType} from '../dal/ws.api';
import {ThunkDispatchType} from "../utils/hooks";

export type ChatActionsType = ReturnType<typeof setInitChatState>
    | ReturnType<typeof setChatUsersOnline>
    | ReturnType<typeof setIsChatSendSounds>
    | ReturnType<typeof addChatUserWithSound>
    | ReturnType<typeof removeChatUserWithSound>
    | ReturnType<typeof resetChatData>
    | ReturnType<typeof addChatMessages>;

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
        case "ADD_MESSAGE":
            return {...state, chatMessages: [...state.chatMessages, ...action.payload.chatMessages]};
        case "SET_CHAT_USERS_ONLINE":
            return {...state, ...action.payload};
        case "SET_IS_CHAT_SEND_SOUNDS":
            return {...state, ...action.payload};
        case "SET_CHAT_USER_WITH_SOUND":
            return {...state, usersWithSound: [...state.usersWithSound, action.payload.userWithSound]};
        case "REMOVE_CHAT_USER_WITH_SOUND":
            return {...state, usersWithSound: state.usersWithSound.filter(u => u.username !== action.payload.userWithoutSound.username)};
        case "RESET_CHAT_DATA":
            return {...state, chatMessages: [], usersOnline: []};
        case "SET_INIT_CHAT_STATE":
            return {...action.payload.initChatState};
        default:
            return state;
    }
};

export const addChatMessages = (chatMessages: Array<IChatMessage>) => {
    return {
        type: 'ADD_MESSAGE',
        payload: {chatMessages}
    } as const;
};

export const setChatUsersOnline = (usersOnline: Array<IChatUser>) => {
    return {
        type: 'SET_CHAT_USERS_ONLINE',
        payload: {usersOnline}
    } as const;
};

export const setIsChatSendSounds = (isSendSounds: boolean) => {
    return {
        type: 'SET_IS_CHAT_SEND_SOUNDS',
        payload: {isSendSounds}
    } as const;
};

export const addChatUserWithSound = (userWithSound: IChatUser) => {
    return {
        type: 'SET_CHAT_USER_WITH_SOUND',
        payload: {userWithSound}
    } as const;
};

export const removeChatUserWithSound = (userWithoutSound: IChatUser) => {
    return {
        type: 'REMOVE_CHAT_USER_WITH_SOUND',
        payload: {userWithoutSound}
    } as const;
};

export const resetChatData = () => {
    return {
        type: 'RESET_CHAT_DATA'
    } as const;
};

export const setInitChatState = () => {
    return {
        type: 'SET_INIT_CHAT_STATE',
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
