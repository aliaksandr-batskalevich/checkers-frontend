import React from 'react';
import s from './TopUser.module.scss';
import {ITopUser} from "../../../../../models/IUser";

type TopUserPropsType = ITopUser & {position: number, viewProfile: (id: number) => void};

export const TopUser: React.FC<TopUserPropsType> = ({position, id, username, rating, viewProfile}) => {

    const viewProfileHandler = () => {
        viewProfile(id);
    };

    const styleMaker = () => {
        switch (position) {
            case 1:
                return {color: '#5B05CBFF', width: '250px'};
            case 2:
                return {color: '#4907cc', width: '280px'};
            case 3:
                return {color: '#3207cc', width: '310px'};
            case 4:
                return {color: '#1b07cc', width: '340px'};
            case 5:
                return {color: '#0735cc', width: '370px'};
            case 6:
                return {color: '#074ccc', width: '400px'};
            case 7:
                return {color: '#077acc', width: '430px'};
            case 8:
                return {color: '#036055', width: '460px'};
            case 9:
                return {color: '#496003', width: '490px'};
            case 10:
                return {color: '#605103', width: '520px'};
            default:
                return {color: 'black', width: '550px'};
        }
    };

    return (
        <div
            className={s.topUserWrapper}
            style={styleMaker()}
            onClick={viewProfileHandler}>
            <div>{position}</div>
            <div>{username}</div>
            <div>{rating}</div>
        </div>
    );
};