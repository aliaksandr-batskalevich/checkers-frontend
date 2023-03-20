import {IUser} from "./IUser";

export type AuthResponseDataType = {
    message: string
    data: {
        tokens: {
            accessToken: string
            refreshToken: string
        }
        user: IUser
    }
};

export type LogoutResponse = Omit<AuthResponseDataType, 'data'>;