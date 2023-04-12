import {Colors} from "./game/Colors";
import {CellFigureExportType} from "./game/CellFigureExportType";

export type IGameProgressType = {
    currentOrder: Colors
    figures: Array<CellFigureExportType>
};