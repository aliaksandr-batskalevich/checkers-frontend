import {AuthResponseDataType, LogoutResponse} from "../models/authResponseDataType";
import {AllUsersResponse, DeleteUserResponse, UserResponse} from "../models/users.response";
import instance from "./instance";


export class AuthAPI {
    static async signUp(username: string, password: string, email: string): Promise<AuthResponseDataType> {
        return instance.post<AuthResponseDataType>('auth/registration', {username, password, email})
            .then(response => response.data);
    }

    static async signIn(username: string, password: string): Promise<AuthResponseDataType> {
        return instance.post<AuthResponseDataType>('auth/login', {username, password})
            .then(response => response.data);
    }

    static async logout(): Promise<LogoutResponse> {
        return instance.delete<LogoutResponse>('auth/logout')
            .then(response => response.data);
    }

    static async refresh(): Promise<AuthResponseDataType> {
        return instance.get('auth/refresh')
            .then(response => response.data);
    }

}

export class UserAPI {
    static async getUser(id: number): Promise<UserResponse> {
        return instance.get<UserResponse>(`users/${id}`)
            .then(response => response.data);
    }

    static async getAllUsers(): Promise<AllUsersResponse> {
        return instance.get<AllUsersResponse>('users')
            .then(response => response.data);
    }

    static async deleteUser(id: number): Promise<DeleteUserResponse> {
        return instance.delete<DeleteUserResponse>(`users/${id}`)
            .then(response => response.data);
    }

}

