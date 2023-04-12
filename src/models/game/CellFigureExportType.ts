import {Colors} from "./Colors";
import {FiguresNames} from "./figures/FiguresNames";

export type CellFigureExportType = {
    x: number
    y: number
    figure: {
        color: Colors
        name: FiguresNames
    }
}