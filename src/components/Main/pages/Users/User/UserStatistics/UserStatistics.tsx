import React from 'react';
import s from './UserStatistics.module.scss';

interface UserStatisticsProps {
    gamesJuniorCount: number
    gamesJuniorWinsCount: number
    gamesMiddleCount: number
    gamesMiddleWinsCount: number
    gamesSeniorCount: number
    gamesSeniorWinsCount: number
    sparringCount: number
    sparringWinsCount: number
}

export const UserStatistics: React.FC<UserStatisticsProps> = ({
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
            <table className={s.table}>
                <tr>
                    <th className={s.statisticTitle}>Statistic</th>
                    <th>Count</th>
                    <th>Wins</th>
                </tr>
                <tr>
                    <th>Games</th>
                    <td>{gamesJuniorCount + gamesMiddleCount + gamesSeniorCount}</td>
                    <td>{gamesJuniorWinsCount + gamesMiddleWinsCount + gamesSeniorWinsCount}</td>
                </tr>
                <tr>
                    <th>Sparring</th>
                    <td>{sparringCount}</td>
                    <td>{sparringWinsCount}</td>
                </tr>
            </table>
        </div>
    );
};