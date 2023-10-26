import React, {useEffect, useState} from 'react';
import s from './Games.module.scss';
import {NewGameForm} from "./NewGameForm/NewGameForm";
import SuperPaginator from "../Users/Paginator/SuperPaginator";
import {GameItem} from "./GameItem/GameItem";
import {GamesFilter} from "./GamesFilter/GamesFilter";
import {useNavigate} from "react-router-dom";
import {
    createGameTC,
    GamesFilterType,
    getGamesTC,
    setGamesCurrentPage,
    setGamesFilter,
    setIsGamesFilterInit
} from "../../../../bll/games.reducer";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../utils/hooks/useAppDispatch";
import {Preloader} from "../../../commons/Preloader/Preloader";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {Colors} from "../../../../models/game/Colors";
import {
    getGameItems,
    getGameItemsCountOnPage,
    getGamesCurrentPage,
    getGamesFilter,
    getGamesTotalPageCount,
    getIsGamesFetching,
    getIsGamesFilterInit,
    getIsNewGameCreating
} from "../../../../bll/games.selector";


export const Games = () => {

    const [isNewGameMenu, setIsNewGameMenu] = useState<boolean>(false);


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isGameFilterInit = useSelector(getIsGamesFilterInit);
    const isGamesFetching = useSelector(getIsGamesFetching);
    const isNewGameCreating = useSelector(getIsNewGameCreating);
    const gamesFilter = useSelector(getGamesFilter);
    const gameItems = useSelector(getGameItems);


    const currentPage = useSelector(getGamesCurrentPage);
    const totalPageCount = useSelector(getGamesTotalPageCount);
    const itemsCountOnPage = useSelector(getGameItemsCountOnPage);


    const setFilterHandler = (filter: GamesFilterType) => {
        dispatch(setGamesFilter(filter));
    };
    const setCurrentPageHandler = (currentPage: number) => {
        dispatch(setGamesCurrentPage(currentPage));
    };
    const setNewGameMenuHandler = () => {
        setIsNewGameMenu(true);
    };
    const createNewGameHandler = (level: number) => {

        const defaultOrder = Colors.BLACK;

        dispatch(createGameTC(level, defaultOrder))
            .then(response => {
                dispatch(addSnackbarInfoMessage(response.message || 'Success!'));
                const createdGameId = response.data.game.id;
                navigate(String(createdGameId));
            })
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            })
            .finally(() => {
                setIsNewGameMenu(false);
            })
    };
    const cancelNewGameHandler = () => {
        setIsNewGameMenu(false);
    };
    const continueGameHandler = (id: number) => {
        navigate(String(id));
    };


    const gameItemsToRender = gameItems.length
        ? gameItems.map(item => <GameItem
            key={item.id}
            {...item}
            continueGame={continueGameHandler}/>)
        : <h3 className={s.searchMessage}>No games found matching your search.</h3>;


    const newGameBlurStyle = {
        filter: 'blur(3px)',
        pointerEvents: 'none' as const,
    };


    // init gamesFilter
    useEffect(() => {
        dispatch(setIsGamesFilterInit(false));
        setCurrentPageHandler(1);

        dispatch(getGamesTC(gamesFilter, itemsCountOnPage, 1))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });

    }, [dispatch, gamesFilter, itemsCountOnPage]);

    // fetch gameItems
    useEffect(() => {

        isGameFilterInit
        && dispatch(getGamesTC(gamesFilter, itemsCountOnPage, currentPage))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });

    }, [dispatch, currentPage, itemsCountOnPage]);


    return (
        <div className={s.gamesWrapper}>
            {isNewGameMenu && <NewGameForm
                isNewGameCreating={isNewGameCreating}
                cancel={cancelNewGameHandler}
                createNewGame={createNewGameHandler}/>}
            <div className={s.gamesContent} style={isNewGameMenu ? newGameBlurStyle : undefined}>
                <button className={s.newGameButton} onClick={setNewGameMenuHandler}>New game</button>
                <GamesFilter
                    currentFilter={gamesFilter}
                    setFilter={setFilterHandler}/>

                {isGameFilterInit && <SuperPaginator
                    viewPagesOddNumber={11}
                    pageJumpPositive={10}
                    currentPage={currentPage}
                    totalPage={totalPageCount}
                    setCurrentPage={setCurrentPageHandler}
                />}

                {isGamesFetching
                    ? <Preloader/>
                    : gameItemsToRender}
            </div>
        </div>
    );
};