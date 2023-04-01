import {IChatMessage} from "../models/IChatMessage";

export type ChatActionsType = ReturnType<typeof setInitChatState>
    | ReturnType<typeof addChatMessages>;

type ChatStateType = {
    chatMessages: Array<IChatMessage>
};

const initChatState: ChatStateType = {
    chatMessages: [],
};

export const chatReducer = (state: ChatStateType = initChatState, action: ChatActionsType): ChatStateType => {
    switch (action.type) {
        case "ADD_MESSAGE":
            return {...state, chatMessages: [...state.chatMessages, ...action.payload.chatMessages]};
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

export const setInitChatState = () => {
    return {
        type: 'SET_INIT_CHAT_STATE',
        payload: {initChatState}
    } as const;
};
