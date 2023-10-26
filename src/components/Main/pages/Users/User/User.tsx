import React from 'react';
import s from './User.module.scss';
import {IUser} from "../../../../../models/IUser";
import defaultAvatar from '../../../../../assets/images/default-avatar.png';
import {NavLink} from "react-router-dom";
import {FollowButton} from "../../../../commons/FollowButton/FollowButton";
import {UserStatistics} from "./UserStatistics/UserStatistics";

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
        subscribersCount,
        isFollowed,
        isFollowing,
        follow,
        unFollow,
        ...statisticsProps
    } = props;

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
                    {authId !== id
                    && <FollowButton
                        isFollowed={isFollowed}
                        isFollowing={isFollowing}
                        follow={followHandler}
                        unfollow={unFollowHandler}
                    />}
                </div>
                <div className={s.status}>
                    <p>{status}</p>
                </div>
                <UserStatistics {...statisticsProps}/>
            </div>
        </div>
    );
};