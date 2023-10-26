import React, {useEffect, useState} from 'react';
import s from './Game.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../../../utils/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {Preloader} from "../../../commons/Preloader/Preloader";
import {finishGameTC, getGameTC, setGameInitState, updateGameTC} from "../../../../bll/game.reducer";
import {addSnackbarErrorMessage} from "../../../../bll/snackbar.reducer";
import {BoardComponent} from "../../../commons/Board/BoardComponent";
import {
    setBoard,
    setLevel,
    setPlayCount,
    setPlayInitState,
    setPlayOrder,
    setPlayStatus,
    setPlayType,
    setWinner
} from "../../../../bll/play.reducer";
import {Status} from "../../../../models/game/GameStatus";
import {Board} from "../../../../models/game/Board";
import {Colors} from "../../../../models/game/Colors";
import {PlayType} from "../../../../models/game/PlayType";
import {CellFigureExportType} from "../../../../models/game/CellFigureExportType";
import {GameWithProgressResponseType} from "../../../../models/responses/game.response";
import {FinishMessage} from "./FinishMessage/FinishMessage";
import {ScoreBoard} from "../../../commons/ScoreBoard/ScoreBoard";
import {getGame, getGameProgress, getIsGameFetching, getIsGameInit} from "../../../../bll/game.selector";
import {getPlayCount, getPlayOrder, getPlayWinner} from "../../../../bll/play.selector";

export const Game = () => {

    const [winnerMessage, setWinnerMessage] = useState<null | string>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const params = useParams<{ id: string }>();
    const gameId = params.id;

    const isGameInit = useSelector(getIsGameInit);
    const isGameFetching = useSelector(getIsGameFetching);
    const count = useSelector(getPlayCount);
    const order = useSelector(getPlayOrder);
    const playWinner = useSelector(getPlayWinner);

    const game = useSelector(getGame);
    const progress = useSelector(getGameProgress);

    const restartGame = () => {
        const level = game!.level;
        const currentOrder = progress!.currentOrder as Colors;

        const newBoard = new Board();
        newBoard.initCells();
        // newBoard.addFigures();
        newBoard.importFigures(progress!.figures);
        newBoard.getCellForward(progress!.currentOrder);

        const count = newBoard.getCount();

        dispatch(setWinner(null));
        dispatch(setPlayCount(count));
        dispatch(setBoard(newBoard));
        dispatch(setPlayType(PlayType.ONE));
        dispatch(setPlayStatus(Status.WAIT));

        // values from server
        dispatch(setLevel(level));
        dispatch(setPlayOrder(currentOrder));
    };

    let closeMenuHandler = () => {
        setWinnerMessage(null);
        dispatch(finishGameTC(+gameId!, playWinner === Colors.BLACK))
            .then(() => {
                navigate('/games');
            })
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

    const setWinnerHandler = (winner: Colors) => {
        const isWon = winner === Colors.BLACK;

        const message = isWon
            ? `You won! Your rating is growing!`
            : `You lost, don't be upset, try again!`

        setWinnerMessage(message);
    };

    // SAVE GAME IN SERVER AND SWITCH ORDER
    const saveGame = (exportsCellFigures: Array<CellFigureExportType>): Promise<GameWithProgressResponseType> => {
        return dispatch(updateGameTC(+gameId!, exportsCellFigures));
    };


    // init game
    useEffect(() => {
        gameId && dispatch(getGameTC(+gameId))
            .catch(reason => {
                navigate(`/info?message=${reason}`);
                dispatch(addSnackbarErrorMessage(reason));
            });

        return () => {
            dispatch(setPlayInitState());
            dispatch(setGameInitState());
        }
    }, [gameId, dispatch, navigate]);

    // restart game
    useEffect(() => {
        isGameInit && restartGame();
    }, [isGameInit]);

    // setWinner
    useEffect(() => {
        count[0] === 0 && !playWinner && dispatch(setWinner(Colors.BLACK));
        count[1] === 0 && !playWinner && dispatch(setWinner(Colors.WHITE));
    }, [count[0], count[1]]);

    // winner from Board
    useEffect(() => {
        playWinner && setWinnerHandler(playWinner);
    }, [playWinner]);


    return (
        !isGameInit
            ? <Preloader/>
            : <div className={s.gameWrapper}>
                <div className={s.messageBoardWrapper}>
                    {isGameFetching && <Preloader/>}
                    {!isGameFetching && winnerMessage &&
                    <FinishMessage message={winnerMessage} closeMessage={closeMenuHandler}/>}
                </div>
                <ScoreBoard
                    color={Colors.WHITE}
                    playType={PlayType.ONE}
                    order={order!}
                    count={count}
                    setWinner={setWinnerHandler}/>
                <BoardComponent isGameFetching={isGameFetching} saveGame={saveGame}/>
                <ScoreBoard
                    color={Colors.BLACK}
                    playType={PlayType.ONE}
                    order={order!}
                    count={count}
                    setWinner={setWinnerHandler}/>
            </div>
    );
};