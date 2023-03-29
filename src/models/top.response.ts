import {IUser} from "./IUser";

export interface TopUsersResponse {
    message: string
    data: {
        topUsers: Array<IUser>
    }
}