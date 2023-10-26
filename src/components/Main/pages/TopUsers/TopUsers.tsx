import React from 'react';
import s from './TopUsers.module.scss';
import {Preloader} from "../../../commons/Preloader/Preloader";
import {TopUser} from "./TopUser/TopUser";
import {useTopUsersFetching} from "../../../../utils/hooks/useTopUsersFetching";

export const TopUsers = () => {

    const {authId, topUsers, isTopUsersFetching} = useTopUsersFetching();

    const topUsersToRender = topUsers.map((topUser, index) => <TopUser
        key={topUser.id}
        position={index + 1}
        isAuthUser={topUser.id === authId}
        {...topUser}
    />);

    return (
        isTopUsersFetching
            ? <Preloader/>
            : <div className={s.topUsersWrapper}>
                <h2>USERS TOP 10</h2>
                <div className={s.header}>
                    <div>position</div>
                    <div>username</div>
                    <div>rating</div>
                </div>
                {topUsersToRender}
            </div>
    );
};