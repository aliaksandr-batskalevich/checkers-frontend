import {Figure} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteKingLogo from '../../../assets/images/white-king.png';
import blackKingLogo from '../../../assets/images/black-king.png';
import {getNextCellAfterCrushedFigure, getTransitCoordinates, testKingTransitCell} from "../../../utils/game/functions";
import {FiguresNames} from "./FiguresNames";

export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.name = FiguresNames.KING;
        this.logo = color === Colors.WHITE ? whiteKingLogo : blackKingLogo;
    }

    canMove(target: Cell): boolean {
        const colorCondition = target.color === Colors.BLACK;
        const noFigureCondition = !target.figure;
        const diagonalCondition = Math.abs(target.y - this.cell.y) === Math.abs(target.x - this.cell.x);

        if (!colorCondition || !noFigureCondition || !diagonalCondition) return false;

        // no double figures on course & mineFigure
        const transitCoordinates = getTransitCoordinates(target, this.cell);
        const transitCells = transitCoordinates.map(coordinate => {
            const [x, y] = coordinate;
            return this.cell.board.getCell(x, y);
        });
        const transitCondition = testKingTransitCell(transitCells, this.color);

        return transitCondition;
    }

    canCrush(target: Cell): boolean {
        const isCourseCondition = Math.abs(target.x - this.cell.x) === Math.abs(target.y - this.cell.y);
        const colorFigureCondition = !!target.figure && target.figure.color !== this.color;
        const nextCellCoordinates = getNextCellAfterCrushedFigure(target, this.cell);

        if (isCourseCondition && nextCellCoordinates && colorFigureCondition) {
            const [nextCellX, nextCellY] = nextCellCoordinates;
            const nextTargetCell = this.cell.board.getCell(nextCellX, nextCellY);
            const freeNextCellCondition = !nextTargetCell.figure;
            return freeNextCellCondition && this.canMove(nextTargetCell);

        } else return false;
    }
}