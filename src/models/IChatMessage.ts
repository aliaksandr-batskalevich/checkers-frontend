export type IChatMessage = {
    id: number
    authorId: number
    author: string
    message: string
    date: string
};

export type IChatUser = {
    userId: number
    username: string
};

export type IChatObject = {
    messages: Array<IChatMessage>,
    usersOnline: Array<IChatUser>
};