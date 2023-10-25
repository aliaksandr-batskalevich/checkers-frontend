import {IUser} from "../IUser";

export type AuthResponse = {
    message: string
    data: {
        tokens: {
            accessToken: string
            refreshToken: string
        }
        user: IUser
    }
};

export type LogoutResponse = Omit<AuthResponse, 'data'>;