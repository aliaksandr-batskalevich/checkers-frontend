import React from 'react';
import s from './TopUser.module.scss';
import {ITopUser} from "../../../../../models/IUser";
import {Link} from "react-router-dom";
import {topUserStyleMaker} from "../../../../../utils/style/topUser.stylemaker";

type TopUserPropsType = ITopUser & {
    position: number,
    isAuthUser: boolean
};

export const TopUser: React.FC<TopUserPropsType> = ({position, id, username, rating, isAuthUser}) => {

    return (
        <Link
            to={`/profile/${id}`}
            style={topUserStyleMaker(position, isAuthUser)}
            className={s.topUserWrapper}
        >
            <div>{position}</div>
            <div>{username}</div>
            <div>{rating}</div>
        </Link>
    );
};