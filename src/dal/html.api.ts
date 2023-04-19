import {AuthResponse, LogoutResponse} from "../models/auth.response";
import {AllUsersResponse, DeleteUserResponse, UserResponse} from "../models/users.response";
import instance, {refreshInstance} from './instance'
import {TopUsersResponse} from "../models/top.response";
import {CreateGameResponseType, GetGameItemsResponseType} from "../models/games.response";
import {GamesFilterType} from "../bll/games.reducer";
import {GameWithProgressResponseType} from "../models/game.response";
import {Colors} from "../models/game/Colors";
import {UpdateGameStatusType} from "../models/UpdateGameStatusType";
import {FollowResponse} from "../models/follow.response";


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

export class FollowAPI {

    static async follow(id: number): Promise<FollowResponse> {
        return instance.post<FollowResponse>(`follow/${id}`)
            .then(response => response.data);
    }

    static async unFollow(id: number): Promise<FollowResponse> {
        return instance.delete<FollowResponse>(`follow/${id}`)
            .then(response => response.data);
    }

}

export class TopUsersAPI {

    static async getTopUsers(count: number): Promise<TopUsersResponse> {
        return instance.get<TopUsersResponse>(`top?count=${count}`)
            .then(response => response.data);
    }

}

export class GamesAPI {

    static async createGame(level: number, currentOrder: Colors, figuresJSON: string): Promise<CreateGameResponseType> {
        return instance.post<CreateGameResponseType>('games', {level, currentOrder, figures: figuresJSON})
            .then(response => response.data);
    }

    static async getGames(filter: GamesFilterType, count: number, page: number): Promise<GetGameItemsResponseType> {
        return instance.get<GetGameItemsResponseType>(`games?filter=${filter}&count=${count}&page=${page}`)
            .then(response => response.data);
    }

    static async getGame(id: number): Promise<GameWithProgressResponseType> {
        return instance.get<GameWithProgressResponseType>(`games/${id}`)
            .then(response => response.data);
    }

    static async updateGame(id: number, figuresJSON: string): Promise<GameWithProgressResponseType> {
        return instance.put<GameWithProgressResponseType>(`games/${id}`, {status: UpdateGameStatusType.STEP, figures: figuresJSON})
            .then(response => response.data);
    }

    static async finishGame(id: number, isWon: boolean): Promise<GameWithProgressResponseType> {
        return instance.put<GameWithProgressResponseType>(`games/${id}`, {status: UpdateGameStatusType.FINISH, isWon})
            .then(response => response.data);
    }

}

