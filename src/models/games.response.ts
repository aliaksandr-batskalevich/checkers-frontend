import {IGameItemType} from "./IGameItem";

export type CreateGameResponseType = {
    message: string
    data: {
        game: IGameItemType
    }
};

export type GetGameItemsResponseType = {
    message: string
    data: {
        totalCount: number,
        games: Array<IGameItemType>
    }
};