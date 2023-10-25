import React from 'react';
import s from './UserOnline.module.scss';
import {IChatUser} from "../../../../../../models/IChatMessage";
import {MuteButton} from "../../../../../commons/MuteButton/MuteButton";

type UserOnlinePropsType = {
    authUsername: string
    user: IChatUser
    isUserSounds: boolean
    switchIncomingSounds: (isSounds: boolean, user: IChatUser) => void
};

export const UserOnline: React.FC<UserOnlinePropsType> = ({
                                                              authUsername,
                                                              user,
                                                              isUserSounds,
                                                              switchIncomingSounds
                                                          }) => {

    const switchSoundsHandler = (isSounds: boolean) => {
        switchIncomingSounds(isSounds, user);
    };

    return (
        <div className={s.userOnlineWrapper}>
            <h4>{user.username}</h4>
            {authUsername !== user.username && <MuteButton
                isSounds={isUserSounds}
                switchSounds={switchSoundsHandler}
            />}
        </div>
    );
};