import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";
import {v1} from "uuid";
import {King} from "./figures/King";

export class Cell {
    id: string;
    board: Board;
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;

    isAvailable: boolean;
    isDanger: boolean;
    isForward: boolean;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.id = v1();
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;

        this.isAvailable = false;
        this.isDanger = false;
        this.isForward = false;
    };

    moveFigure(target: Cell) {
        if (this.figure) {
            this.figure.moveFigure(target);
            target.figure = this.figure;
            this.figure = null;

            // transform figure in KING
            if (target.y === 0 && target.figure.color === Colors.BLACK
            || target.y === 7 && target.figure.color === Colors.WHITE) {
                target.transformFigure();
            }
        }
    }

    transformFigure() {
        if (this.figure) {
            let newFigure = new King(this.figure.color, this);
            this.figure = newFigure;
        }
    }
}