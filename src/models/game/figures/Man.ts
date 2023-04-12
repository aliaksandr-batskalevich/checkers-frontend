import {Figure} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteManLogo from '../../../assets/images/white-man.png';
import blackManLogo from '../../../assets/images/black-man.png';
import {getNextCellAfterCrushedFigure, getTransitCoordinates} from "../../../utils/game/functions";
import {FiguresNames} from "./FiguresNames";


export class Man extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.name = FiguresNames.MAN;
        this.logo = color === Colors.WHITE ? whiteManLogo : blackManLogo;
    }

    canMove(target: Cell): boolean {
        const colorCondition = target.color === Colors.BLACK;
        const noFigureCondition = !target.figure;
        if (!colorCondition || !noFigureCondition) return false;

        const conditionCourseOneWhite = target.y === this.cell.y + 1;
        const conditionCourseOneBlack = target.y === this.cell.y - 1;
        const courseOneCondition = this.color === Colors.WHITE
            ? conditionCourseOneWhite
            : conditionCourseOneBlack;
        const conditionFrontFree = Math.abs(target.x - this.cell.x) === 1
            && courseOneCondition
            && !target.figure;

        if (conditionFrontFree) return true;

        // can move after crush
        const isOnCourseTwoSteps = Math.abs(target.x - this.cell.x) === Math.abs(target.y - this.cell.y)
            && Math.abs(target.x - this.cell.x) === 2;
        if (!isOnCourseTwoSteps) return false;

        const transitCoordinates = getTransitCoordinates(target, this.cell);
        const [x, y] = transitCoordinates[0];
        const cell = this.cell.board.getCell(x, y);

        const conditionMoveAfterCrush = cell.figure && cell.figure.color !== this.color;

        return !!conditionMoveAfterCrush;

    }

    canCrush(target: Cell): boolean {
        const colorCondition = !!target.figure && target.figure.color !== this.color;
        const nextCell = getNextCellAfterCrushedFigure(target, this.cell);
        if (!nextCell) return false;

        const [nextCellX, nextCellY] = nextCell;
        const nextTargetCell = this.cell.board.getCell(nextCellX, nextCellY);
        const freeNextCellCondition = !nextTargetCell.figure;

        const condition = colorCondition
            && Math.abs(target.x - this.cell.x) === 1
            && Math.abs(target.y - this.cell.y) === 1
            && freeNextCellCondition;

        return condition;
    }

}