export type IUser = {
    id: number
    username: string
    isActivated: boolean
    isFollowed: boolean
    status: null | string
} & IUserStatistics;

export type IUserStatistics = {
    subscribersCount: number
    gamesCount: number
    gamesWinsCount: number
    sparringCount: number
    sparringWinsCount: number
    rating: number
}

export type ITopUser = Pick<IUser, 'id' | 'username' | 'rating'>;