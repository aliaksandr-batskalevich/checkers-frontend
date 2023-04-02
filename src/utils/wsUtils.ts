import {readAccessTokenInLS} from "./acceesTokenLS";

export const authMessageMaker = () => {
    const accessToken = readAccessTokenInLS();
    const newMessage = {type: 'auth', data: {accessToken}};
    return JSON.stringify(newMessage);
};

export const chatMessageMaker = (message: string) => {
    const newMessage = {type: 'chat', data: {message}};
    return JSON.stringify(newMessage);
};

export const pingMessageMaker = () => {
    const newMessage = {type: 'ping', data: {}};
    return JSON.stringify(newMessage);
}