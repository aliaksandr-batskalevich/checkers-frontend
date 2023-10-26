import React from 'react';
import s from './ProfileStatistics.module.scss';

interface ProfileStatisticsProps {
    rating: number;

    gamesJuniorCount: number
    gamesJuniorWinsCount: number
    gamesMiddleCount: number
    gamesMiddleWinsCount: number
    gamesSeniorCount: number
    gamesSeniorWinsCount: number

    sparringCount: number
    sparringWinsCount: number

}

export const ProfileStatistics: React.FC<ProfileStatisticsProps> = ({
                                                                        rating,
                                                                        gamesJuniorCount,
                                                                        gamesJuniorWinsCount,
                                                                        gamesMiddleCount,
                                                                        gamesMiddleWinsCount,
                                                                        gamesSeniorCount,
                                                                        gamesSeniorWinsCount,
                                                                        sparringCount,
                                                                        sparringWinsCount
                                                                    }) => {
    return (
        <div className={s.statistics}>
            <h3>Statistics</h3>
            <p>Rating: <span>{rating}</span></p>
            <p>gamesJuniorCount/Wins: <span>{`${gamesJuniorCount}/${gamesJuniorWinsCount}`}</span></p>
            <p>gamesMiddleCount/Wins: <span>{`${gamesMiddleCount}/${gamesMiddleWinsCount}`}</span></p>
            <p>gamesSeniorCount/Wins: <span>{`${gamesSeniorCount}/${gamesSeniorWinsCount}`}</span></p>
            <p>sparringCount/Wins: <span>{`${sparringCount}/${sparringWinsCount}`}</span></p>
        </div>
    );
};