export type IUser = {
    id: number
    username: string
    isActivated: boolean

    gamesCount: number
    gamesWinsCount: number
    sparringCount: number
    sparringWinsCount: number
    rating: number
}

export type ITopUser = Pick<IUser, 'id' | 'username' | 'rating'>;