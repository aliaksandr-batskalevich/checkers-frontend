import {AuthResponseDataType, LogoutResponse} from "../models/authResponseDataType";
import {AllUsersResponse, DeleteUserResponse, UserResponse} from "../models/users.response";
import instance, {refreshInstance} from './instance'


export class AuthAPI {
    static async signUp(username: string, email: string, password: string): Promise<AuthResponseDataType> {
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

        // request without interceptors
        return refreshInstance.get<AuthResponseDataType>('auth/refresh')
            .then(response => response.data);
    }

}

export class UserAPI {
    static async getUser(id: number): Promise<UserResponse> {
        return instance.get<UserResponse>(`users/${id}`)
            .then(response => response.data);
    }

    static async getUsers(count: number, page: number): Promise<AllUsersResponse> {
        return instance.get<AllUsersResponse>(`users?count=${count}&page=${page}`)
            .then(response => response.data);
    }

    static async deleteUser(id: number): Promise<DeleteUserResponse> {
        return instance.delete<DeleteUserResponse>(`users/${id}`)
            .then(response => response.data);
    }

}

