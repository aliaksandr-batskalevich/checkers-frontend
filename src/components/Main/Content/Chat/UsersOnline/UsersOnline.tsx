import React from 'react';
import s from './UsersOnline.module.scss';
import {IChatUser} from "../../../../../models/IChatMessage";
import {UserOnline} from "./UserOnline/UserOnline";

type UsersOnlinePropsType = {
    authUsername: string
    chatUsersOnline: Array<IChatUser>
    usersWithSound: Array<IChatUser>
    switchIncomingSounds: (isSounds: boolean, user: IChatUser) => void
}

export const UsersOnline: React.FC<UsersOnlinePropsType> = ({
                                                                authUsername,
                                                                chatUsersOnline,
                                                                usersWithSound,
                                                                switchIncomingSounds
                                                            }) => {

    const usersOnlineToRender = chatUsersOnline.map(user => {
        const isUserSounds = !!usersWithSound.find(us => us.username === user.username);

        return <UserOnline
            key={user.userId}
            authUsername={authUsername}
            user={user}
            isUserSounds={isUserSounds}
            switchIncomingSounds={switchIncomingSounds}
        />
    });

    return (
        <div className={s.usersOnlineWrapper}>
            <h3 className={s.title}>Users ONLINE:</h3>
            <div className={s.usersContainer}>
                {usersOnlineToRender}
            </div>
        </div>
    );
};

export default UsersOnline;