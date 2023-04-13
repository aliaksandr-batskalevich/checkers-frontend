import {IChatMessage, IChatObject, IChatUser} from "../models/IChatMessage";
import webSocketInstance, {WebSocketSubscriberType} from '../dal/ws.api';
import {ThunkDispatchType} from "../utils/hooks";

export type ChatActionsType = ReturnType<typeof setInitChatState>
    | ReturnType<typeof setChatUsersOnline>
    | ReturnType<typeof addChatMessages>;

type ChatStateType = {
    chatMessages: Array<IChatMessage>
    usersOnline: Array<IChatUser>
};

const initChatState: ChatStateType = {
    chatMessages: [],
    usersOnline: [],
};

export const chatReducer = (state: ChatStateType = initChatState, action: ChatActionsType): ChatStateType => {
    switch (action.type) {
        case "ADD_MESSAGE":
            return {...state, chatMessages: [...state.chatMessages, ...action.payload.chatMessages]};
        case "SET_CHAT_USERS_ONLINE":
            return {...state, ...action.payload};
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
};
