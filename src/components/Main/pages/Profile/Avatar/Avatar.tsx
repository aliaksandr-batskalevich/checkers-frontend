import React from 'react';
import s from './Avatar.module.scss';
import defaultAvatar from "../../../../../assets/images/default-avatar.png";
import {addSnackbarInfoMessage} from "../../../../../bll/snackbar.reducer";
import {useAppDispatch} from "../../../../../utils/hooks/useAppDispatch";

interface AvatarProps {
    isMyAccount: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({isMyAccount}) => {

    const dispatch = useAppDispatch();

    const editAvatarHandler = () => {
        dispatch(addSnackbarInfoMessage('Feature under development.'));
    };

    return (
        <div className={s.avatar}>
            <img src={defaultAvatar} alt="avatar"/>
            {isMyAccount
            && <button
                className={s.editButton}
                onClick={editAvatarHandler}
            >
                edit
            </button>}
        </div>
    );
};