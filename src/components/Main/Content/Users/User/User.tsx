import React from 'react';
import s from './User.module.scss';
import {IUser} from "../../../../../models/IUser";
import defaultAvatar from '../../../../../assets/images/default-avatar.png';
import {NavLink} from "react-router-dom";

type UserPropsType = IUser & {authId: null | number, follow: (id: number) => void};

export const User: React.FC<UserPropsType> = ({authId,id, username, isActivated, rating, gamesCount, gamesWinsCount, sparringCount, sparringWinsCount, follow}) => {

    const followHandler = () => {
        follow(id);
    };

    return (
        <NavLink to={`/profile/${id}`} className={s.userWrapper}>
            <div className={s.avatarWrapper}>
                <img src={defaultAvatar} alt="avatar"/>
            </div>
            <div className={s.descriptionWrapper}>
                <div className={s.userInfo}>
                    <h3>{username}</h3>
                    <p>rating: <span>{rating}</span></p>
                    {authId !== id && <button onClick={followHandler}>submit</button>}
                </div>
                <div className={s.statistics}>
                    <table className={s.table}>
                        <tr>
                            <th className={s.statisticTitle}>Statistic</th>
                            <th>Count</th>
                            <th>Wins</th>
                        </tr>
                        <tr>
                            <th>Games</th>
                            <td>{gamesCount}</td>
                            <td>{gamesWinsCount}</td>
                        </tr>
                        <tr>
                            <th>Sparring</th>
                            <td>{sparringCount}</td>
                            <td>{sparringWinsCount}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </NavLink>
    );
};