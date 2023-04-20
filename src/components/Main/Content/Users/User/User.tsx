import React from 'react';
import s from './User.module.scss';
import {IUser} from "../../../../../models/IUser";
import defaultAvatar from '../../../../../assets/images/default-avatar.png';
import {NavLink} from "react-router-dom";

type UserPropsType = IUser
    & {
    authId: null | number
    isFollowing: boolean
    follow: (id: number) => void
    unFollow: (id: number) => void
};

export const User: React.FC<UserPropsType> = (props) => {

    const {
        authId,
        id,
        username,
        isActivated,
        status,
        rating,
        gamesCount,
        gamesWinsCount,
        sparringCount,
        sparringWinsCount,
        subscribersCount,
        isFollowed,
        isFollowing,
        follow,
        unFollow
    } = props;

    console.log(status);

    const followHandler = () => {
        follow(id);
    };

    const unFollowHandler = () => {
        unFollow(id);
    };

    return (
        <div className={s.userWrapper}>
            <div className={s.logoWrapper}>
                <img src={defaultAvatar} alt="avatar"/>
            </div>
            <div className={s.descriptionWrapper}>
                <div className={s.info}>
                    <NavLink to={`/profile/${id}`}><h3>{username}</h3></NavLink>
                    <p>rating: <span>{rating}</span></p>
                    {authId !== id && <div className={s.followButtonsWrapper}>
                        {isFollowed
                            ? <button onClick={unFollowHandler} disabled={isFollowing}>unFollow</button>
                            : <button onClick={followHandler} disabled={isFollowing}>follow</button>}
                    </div>}
                </div>
                <div className={s.status}>
                    <p>{status}</p>
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
        </div>
    );
};