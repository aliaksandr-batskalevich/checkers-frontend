import {IGameItemType} from "../IGameItem";
import {IGameProgressType} from "../IGameProgress";
import {Colors} from "../game/Colors";
import {CellFigureExportType} from "../game/CellFigureExportType";

export type GameWithProgressResponseType = {
    message: string
    data: {
        game: IGameItemType
        progress: IGameProgressType
    }
}

export type UpdateGameResponseType = {
    message: string
    data: {
        currentOrder: Colors
        figures: CellFigureExportType
    }
}