import React from 'react';
import s from './GamesFilter.module.scss';
import {GamesFilterType} from "../../../../../bll/games.reducer";

type GamesFilterPropsType = {
    currentFilter: GamesFilterType
    setFilter: (filter: GamesFilterType) => void
};

export const GamesFilter: React.FC<GamesFilterPropsType> = ({currentFilter, setFilter}) => {

    const setFilterAllHandler = () => {
        setFilter(GamesFilterType.ALL);
    };
    const setFilterInProgressHandler = () => {
        setFilter(GamesFilterType.PROGRESS);
    };
    const setFilterCompletedHandler = () => {
        setFilter(GamesFilterType.COMPLETED);
    };
    const setFilterSuccessfulHandler = () => {
        setFilter(GamesFilterType.SUCCESSFUL);
    };

    return (
        <div className={s.gamesFilterWrapper}>
            <button
                className={currentFilter === GamesFilterType.ALL ? s.activeButton : ''}
                onClick={setFilterAllHandler}
            >
                all
            </button>
            <button
                className={currentFilter === GamesFilterType.PROGRESS ? s.activeButton : ''}
                onClick={setFilterInProgressHandler}
            >
                in progress
            </button>
            <button
                className={currentFilter === GamesFilterType.COMPLETED ? s.activeButton : ''}
                onClick={setFilterCompletedHandler}
            >
                completed
            </button>
            <button
                className={currentFilter === GamesFilterType.SUCCESSFUL ? s.activeButton : ''}
                onClick={setFilterSuccessfulHandler}
            >
                successful
            </button>
        </div>
    );
};