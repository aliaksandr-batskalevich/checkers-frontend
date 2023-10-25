import {RootStateType} from "./store";
import {IChatMessage, IChatUser} from "../models/IChatMessage";


export const getChatMessages = (state: RootStateType): Array<IChatMessage> => state.chat.chatMessages;
export const getChatUsersOnline = (state: RootStateType): Array<IChatUser> => state.chat.usersOnline;
export const getChatIsSendSounds = (state: RootStateType): boolean => state.chat.isSendSounds;
export const getChatUsersWithSound = (state: RootStateType): Array<IChatUser> => state.chat.usersWithSound;
