import React, {useEffect} from 'react';
import s from './BoardComponent.module.scss';
import {v1} from "uuid";
import {CellComponent} from "./Cell/CellComponent";
import {useSelector} from "react-redux";
import {
    getBoard,
    getForwards,
    getPlayCount,
    getPlayLevel,
    getPlayOrder,
    getPlayStatus,
    getPlayType,
    getSelectedCell
} from "../../../bll/selectors";
import {PlayType} from "../../../models/game/PlayType";
import {Status} from "../../../models/game/GameStatus";
import {
    setBoard,
    setPlayCount,
    setPlayOrder,
    setPlayStatus,
    setSelectedCell,
    setWinner
} from "../../../bll/play.reducer";
import {useAppDispatch} from "../../../utils/hooks";
import {Colors} from "../../../models/game/Colors";
import {Cell} from "../../../models/game/Cell";
import {RootStateType} from "../../../bll/store";
import {CellFigureExportType} from "../../../models/game/CellFigureExportType";
import {GameWithProgressResponseType, UpdateGameResponseType} from "../../../models/game.response";
import {addSnackbarErrorMessage} from "../../../bll/snackbar.reducer";

type BoardComponentPropsType = {
    isGameFetching: boolean
    saveGame?: (exportsCellFigures: Array<CellFigureExportType>) => Promise<GameWithProgressResponseType>
};


export const BoardComponent: React.FC<BoardComponentPropsType> = ({isGameFetching, saveGame}) => {

    const dispatch = useAppDispatch();

    const playType = useSelector(getPlayType);
    const level = useSelector(getPlayLevel);
    const count = useSelector(getPlayCount);
    const order = useSelector(getPlayOrder);
    const status = useSelector(getPlayStatus);
    const selectedCell = useSelector(getSelectedCell);
    const board = useSelector(getBoard);
    const forwards = useSelector(getForwards);

    const moveFigureToTargetCell = (selectedCell: Cell, targetCell: Cell) => {
        selectedCell.moveFigure(targetCell);
        dispatch(setPlayStatus(Status.MOVE));
        setSelectedCellHandler(targetCell);
    };

    const autoMoveHandler = (color: Colors) => {
        const [cell, targetCell] = board.getCellAutoMove(order!, selectedCell, level!);
        if (cell && targetCell) {
            moveFigureToTargetCell(cell, targetCell);
        } else {
            dispatch(setWinner(color === Colors.WHITE
                ? Colors.BLACK
                : Colors.WHITE));
        }
    };

    const updateBoard = () => {
        let updatedBoard = board.getCopyBoard();
        let updatedCount = updatedBoard.getCount();
        if (count[0] + count[1] !== updatedCount[0] + updatedCount[1]) {

            if (selectedCell?.isForward) {
                dispatch(setPlayStatus(Status.CRASH));
                if (order === Colors.WHITE && playType === PlayType.ONE) {
                    autoMoveHandler(Colors.WHITE);
                }
            } else {
                dispatch(setPlayStatus(Status.WAIT));
                changeOrder();
            }

            dispatch(setPlayCount(updatedCount));

        } else if (status === Status.MOVE) {
            dispatch(setPlayStatus(Status.WAIT));
            changeOrder();
        }

        dispatch(setBoard(updatedBoard));

    };


    const changeOrder = () => {

        // SAVE GAME to SERVER
        if (saveGame && order) {
            const exportsCellFigures = board.exportFigures();
            saveGame(exportsCellFigures)
                .then(response => {
                    // switch ORDER by server response - must be fix
                    // dispatch(setPlayOrder(response.data.progress.currentOrder));
                    // setSelectedCellHandler(null);
                })
                .catch(reason => {
                    dispatch(addSnackbarErrorMessage(reason));
                });
        }

        let newOrder = order === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
        dispatch(setPlayOrder(newOrder));
        setSelectedCellHandler(null);

    };

    const setSelectedCellHandler = (cell: null | Cell) => {
        dispatch(setSelectedCell(cell));
    };

    const cellOnClickHandler = (cell: Cell) => {

        if (!isGameFetching) {
            // select figures
            if (status === Status.WAIT && cell.figure?.color === order) {
                if (forwards.length) {
                    forwards.includes(cell) && setSelectedCellHandler(cell);
                } else {
                    setSelectedCellHandler(cell);
                }
            }

            // move to target cell
            if (cell.isAvailable && selectedCell) {
                moveFigureToTargetCell(selectedCell, cell);
            }
        }
    };


    useEffect(() => {

        board.getCellAvailable(selectedCell);
        board.getCellForward(order!);
        updateBoard();

    }, [selectedCell]);

    useEffect(() => {

        if (!isGameFetching && order === Colors.WHITE && playType === PlayType.ONE) {
            autoMoveHandler(Colors.WHITE);
        }
    }, [order, isGameFetching]);


    const cellsToRender = board._cells.map(row =>
        <React.Fragment key={v1()}>
            {row.map(cell => <CellComponent
                key={cell.id}
                cell={cell}
                isSelected={selectedCell === cell}
                cellOnClick={cellOnClickHandler}
            />)}
        </React.Fragment>
    );

    // arrays for app
    const lettersArr = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ''];
    const numbersArr = [1, 2, 3, 4, 5, 6, 7, 8];

    // markUpArrays for development
    // const lettersArr = ['', '0', '1', '2', '3', '4', '5', '6', '7', ''];
    // const numbersArr = [7, 6, 5, 4, 3, 2, 1, 0];

    const lettersToRender = lettersArr.map((l, index) => <div key={index}>{l}</div>);
    const numbersToRender = numbersArr.map((num, index) => <div key={index}>{num}</div>);

    return (
        <div className={s.boardWrapper}>
            <div className={s.lettersRow}>{lettersToRender}</div>
            <div className={s.mainRowWrapper}>
                <div className={s.numbersWrapper}>{numbersToRender}</div>
                <div className={s.cellsWrapper}>
                    {cellsToRender}
                </div>
                <div className={s.numbersWrapper}>{numbersToRender}</div>
            </div>
            <div className={s.lettersRow}>{lettersToRender}</div>
        </div>
    );
};