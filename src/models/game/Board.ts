import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Man} from "./figures/Man";
import {King} from "./figures/King";
import {getTransitCoordinates, randomIndexMaker} from "../../utils/game/functions";
import {FiguresNames} from "./figures/FiguresNames";
import {CellFigureExportType} from "./CellFigureExportType";

enum AutoMoveRating {
    CRASH = 2,                          // crashFigure - +2;
    ANOTHER_DANGER_COUNT_UP = 1,        // for anotherDangerCountUp - +1;
    MY_DANGER_COUNT_UP = -1,            // for myDangerCountUp - -1;
    MY_DANGER_COUNT_DOWN = 1,           // for myDangerCountDown - +1;
    SAVE_FORWARD = 2,                   // selectedCell === forwardCell - +2;
}

type TestMoveResultType = {
    selectedCell: Cell
    target: Cell
    rating: number
};

type FigureForwardFreeCellsType = {
    myCellsFigure: Array<Cell>
    anotherCellsFigure: Array<Cell>
    myCellsForward: Array<Cell>
    freeCell: Array<Cell>
}


export class Board {
    _cells: Array<Array<Cell>> = [];

    public initCells() {
        for (let y = 0; y < 8; y++) {
            const row: Array<Cell> = [];

            for (let x = 0; x < 8; x++) {
                (y + x) % 2
                    ? row.push(new Cell(this, x, y, Colors.BLACK, null))
                    : row.push(new Cell(this, x, y, Colors.WHITE, null));
            }

            this._cells.push(row);
        }
    }

    public getCell(x: number, y: number): Cell {
        return this._cells[y][x];
    }

    public getAllCells() {
        return this._cells.flat();
    }

    public getCount(): Array<number> {
        let whiteCount = 0;
        let blackCount = 0;
        this.getAllCells()
            .forEach((cell) => {
                cell.figure?.color === Colors.WHITE && whiteCount++;
                cell.figure?.color === Colors.BLACK && blackCount++;
            })

        return [whiteCount, blackCount];
    }

    public addFigures() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                new Man(Colors.WHITE, this.getCell(j * 2 + +!(i % 2), i));
                new Man(Colors.BLACK, this.getCell(j * 2 + +!!(i % 2), 7 - i));
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard._cells = this._cells;
        return newBoard;
    }

    public getCellAvailable(selectedCell: Cell | null) {
        const allCells = this.getAllCells();
        const forwards = allCells.filter(cell => cell.isForward);

        this.getCellDanger(selectedCell);

        if (forwards.length && selectedCell) {
            allCells.forEach(cell => {

                let isAvailable = !!selectedCell?.figure?.canMove(cell);

                if (isAvailable) {
                    const transitCells = getTransitCoordinates(selectedCell, cell).map(coordinate => {
                        const [x, y] = coordinate;
                        return this.getCell(x, y);
                    });
                    cell.isAvailable = transitCells.some(transitCell => transitCell.isDanger);
                } else {
                    cell.isAvailable = false;
                }

            });
        } else {

            allCells.forEach(cell => {
                cell.isAvailable = !!selectedCell?.figure?.canMove(cell);
            });

        }
    }

    public getCellDanger(selectedCell: Cell | null) {
        this.getAllCells()
            .forEach(cell => {
                cell.isDanger = !!selectedCell?.figure?.canCrush(cell);
            });
    }

    _getAllCellDanger(selectedCell: Cell | null) {
        this.getAllCells()
            .forEach(cell => {
                if (!cell.isDanger) cell.isDanger = !!selectedCell?.figure?.canCrush(cell);
            });
    }

    public getCellForward(order: Colors) {
        this.getAllCells()
            .forEach((cell, i, arr) => {
                if (cell.figure?.color === order) {
                    const isForward = arr.some(c => cell.figure?.canCrush(c));
                    cell.isForward = isForward;
                } else {
                    cell.isForward = false;
                }
            });
    }

    _getTestBoard() {
        const newTestBoard = new Board();
        newTestBoard.initCells();

        this.getAllCells().forEach(cell => {
            if (cell.figure) {
                const newFigureCell = newTestBoard.getCell(cell.x, cell.y);
                const color = cell.figure.color;
                const name = cell.figure.name;
                newFigureCell.figure = name === FiguresNames.MAN
                    ? new Man(color, newFigureCell)
                    : new King(color, newFigureCell);
            }
        });

        return newTestBoard;
    }

    _getMyDangerCount(myColor: Colors): number {
        const newTestBoard = this._getTestBoard();
        newTestBoard.getAllCells().forEach(cell => {
            let anotherColor = myColor === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
            if (cell.figure?.color === anotherColor) {
                newTestBoard._getAllCellDanger(cell);
            }
        });
        return newTestBoard.getAllCells().filter(cell => cell.isDanger).length;
    }

    _getAnotherDangerCount(myColor: Colors): number {
        const newTestBoard = this._getTestBoard();
        newTestBoard.getAllCells().forEach(cell => {
            if (cell.figure?.color === myColor) {
                newTestBoard._getAllCellDanger(cell);
            }
        });
        return newTestBoard.getAllCells().filter(cell => cell.isDanger).length;
    }

    _getTestMoveResult(myColor: Colors, selectedCell: Cell, target: Cell): TestMoveResultType {
        let rating = 0;

        const myDangerCount = this._getMyDangerCount(myColor);
        const anotherDangerCount = this._getAnotherDangerCount(myColor);
        const {anotherCellsFigure} = this._getFigureForwardFreeCells(myColor);

        const newTestBoard = this._getTestBoard();
        const newSelectedCell = newTestBoard.getCell(selectedCell.x, selectedCell.y);
        const newTargetCell = newTestBoard.getCell(target.x, target.y);
        newSelectedCell.moveFigure(newTargetCell);
        newTestBoard.getCellForward(myColor);

        const newMyDangerCount = newTestBoard._getMyDangerCount(myColor);
        const newAnotherDangerCount = newTestBoard._getAnotherDangerCount(myColor);
        const newAnotherCellsFigure = newTestBoard._getFigureForwardFreeCells(myColor).anotherCellsFigure;

        if (newAnotherCellsFigure.length < anotherCellsFigure.length) rating += AutoMoveRating.CRASH;
        if (newAnotherDangerCount > anotherDangerCount) rating += AutoMoveRating.ANOTHER_DANGER_COUNT_UP;
        if (newMyDangerCount > myDangerCount) rating += AutoMoveRating.MY_DANGER_COUNT_UP;
        if (newMyDangerCount < myDangerCount) rating += AutoMoveRating.MY_DANGER_COUNT_DOWN;
        if (newMyDangerCount < myDangerCount) rating += AutoMoveRating.MY_DANGER_COUNT_DOWN;
        if (selectedCell.isForward && newTargetCell.isForward) rating += AutoMoveRating.SAVE_FORWARD;

        return {selectedCell, target, rating};
    }

    _getFigureForwardFreeCells(myColor: Colors): FigureForwardFreeCellsType {
        const allCells = this.getAllCells();
        const myCellsFigure = allCells.filter(cell => cell.figure?.color === myColor);
        const anotherCellsFigure = allCells.filter(cell => cell.figure?.color === (myColor === Colors.WHITE ? Colors.BLACK : Colors.WHITE));
        const myCellsForward = myCellsFigure.filter(cell => cell.isForward);
        const freeCell = allCells.filter(cell => !cell.figure);

        return {myCellsFigure, anotherCellsFigure, myCellsForward, freeCell};
    }

    public getCellAutoMove(color: Colors, crashingCell: Cell | null, level: number): Array<Cell> {

        let selectedCell = null as null | Cell;
        let targetCell = null as null | Cell;
        const allCells = this.getAllCells();

        switch (level) {

            case 1: {
                if (crashingCell) {
                    selectedCell = crashingCell;
                } else {
                    const {myCellsFigure, myCellsForward, freeCell} = this._getFigureForwardFreeCells(color);

                    if (myCellsForward.length) {
                        selectedCell = myCellsForward[randomIndexMaker(myCellsForward.length - 1)];
                    } else {
                        const myCellsFigureCanMove = myCellsFigure.filter(myCellFigure => freeCell.some(target => myCellFigure.figure?.canMove(target)));
                        selectedCell = myCellsFigureCanMove[randomIndexMaker(myCellsFigureCanMove.length - 1)];
                    }
                }

                this.getCellAvailable(selectedCell);
                const availableCells = allCells.filter(cell => cell.isAvailable);

                targetCell = availableCells[randomIndexMaker(availableCells.length - 1)];

                // alert(`${selectedCell?.x} ${selectedCell?.y} - ${targetCell?.x} ${targetCell?.y} ${myCellsForward.length > 0}`);

                return [selectedCell, targetCell];
            }

            case 2: {
                const moveOptions = [] as Array<TestMoveResultType>

                const addOptions = (selectedCellOptions: Array<Cell>) => {
                    selectedCellOptions.forEach(selectedCell => {
                        const newTestBoard = this._getTestBoard();
                        newTestBoard.getCellAvailable(selectedCell);
                        newTestBoard.getAllCells().filter(cell => cell.isAvailable).forEach(target => {
                            let newForward = newTestBoard.getCell(selectedCell.x, selectedCell.y);
                            let result = newTestBoard._getTestMoveResult(color, newForward, target);

                            moveOptions.push({
                                selectedCell: selectedCell,
                                target: this.getCell(target.x, target.y),
                                rating: result.rating
                            });
                        });
                    });
                };

                if (crashingCell) {
                    this.getCellAvailable(crashingCell);
                    this.getAllCells().filter(cell => cell.isAvailable).forEach(target => {
                        let result = this._getTestMoveResult(color, crashingCell, target);

                        moveOptions.push({
                            selectedCell: crashingCell,
                            target: this.getCell(target.x, target.y),
                            rating: result.rating
                        });
                    });

                } else {
                    const {myCellsFigure, myCellsForward, freeCell} = this._getFigureForwardFreeCells(color);

                    if (myCellsForward.length) {
                        addOptions(myCellsForward);
                    } else {
                        const figuresCanMove = myCellsFigure.filter(cell => freeCell.some(target => cell.figure?.canMove(target)));
                        addOptions(figuresCanMove);
                    }
                }

                if (moveOptions.length) {
                    const bestMoveOption = moveOptions.sort((a, b) => b.rating - a.rating)[0];
                    selectedCell = bestMoveOption.selectedCell;
                    targetCell = bestMoveOption.target;

                    return [selectedCell, targetCell];
                }

                return [];
            }

            default: {
                return [];
            }
        }
    }

    // export figures
    public exportFigures(): Array<CellFigureExportType> {
        return this.getAllCells().filter(cell => cell.figure).map(cell => ({x: cell.x, y: cell.y, figure: {color: cell.figure!.color, name: cell.figure!.name}}));
    }

    // import figures
    public importFigures(cellFigures: Array<CellFigureExportType>) {
        this.getAllCells().forEach(cell => {
            const cellFigure = cellFigures.find(cf => cf.x === cell.x && cf.y === cell.y);
            if (cellFigure?.figure.name === FiguresNames.MAN) {
               cell.figure = new Man(cellFigure!.figure.color, cell);
            }
            if (cellFigure?.figure.name === FiguresNames.KING) {
                cell.figure = new King(cellFigure!.figure.color, cell);
            }
        });
    }

}