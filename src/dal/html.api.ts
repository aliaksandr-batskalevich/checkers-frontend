import {AuthResponse, LogoutResponse} from "../models/auth.response";
import {AllUsersResponse, DeleteUserResponse, UserResponse} from "../models/users.response";
import instance, {refreshInstance} from './instance'
import {TopUsersResponse} from "../models/top.response";


export class AuthAPI {
    static async signUp(username: string, email: string, password: string): Promise<AuthResponse> {
        return instance.post<AuthResponse>('auth/registration', {username, password, email})
            .then(response => response.data);
    }

    static async signIn(username: string, password: string): Promise<AuthResponse> {
        return instance.post<AuthResponse>('auth/login', {username, password})
            .then(response => response.data);
    }

    static async logout(): Promise<LogoutResponse> {
        return instance.delete<LogoutResponse>('auth/logout')
            .then(response => response.data);
    }

    static async refresh(): Promise<AuthResponse> {

        // request without interceptors
        return refreshInstance.get<AuthResponse>('auth/refresh')
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

export class TopUsersAPI {
    static async getTopUsers(count: number): Promise<TopUsersResponse> {
        return instance.get<TopUsersResponse>(`top?count=${count}`)
            .then(response => response.data);
    }
}

