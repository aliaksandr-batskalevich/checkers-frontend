import {Colors} from "../Colors";
import whiteManLogo from '../../assets/images/white-man.png';
import {Cell} from "../Cell";
import {v1} from "uuid";
import {getTransitCoordinates} from "../../../utils/game/functions";
import {FiguresNames} from "./FiguresNames";

export class Figure {
    id: string;
    name: FiguresNames
    color: Colors;
    cell: Cell;
    logo: typeof whiteManLogo | null;


    constructor(color: Colors, cell: Cell) {
        this.id = v1();
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FiguresNames.FIGURE;
    }

    canMove(target: Cell): boolean {
        return false;
    }

    moveFigure(target: Cell) {

        // crush Figure
        const transitCoordinates = getTransitCoordinates(target, this.cell);

        transitCoordinates
            .map(coordinate => {
            let [x, y] = coordinate;
            return this.cell.board.getCell(x, y);
        })
            .forEach(cell => {
            cell.figure?.unMount();
        });

        // move
        this.cell = target;
    }

    canCrush(target: Cell): boolean {
        return false;
    }

    unMount() {
        this.cell.figure = null;
    }
}