import React from 'react';
import s from './ProfileStatus.module.scss';
import {useSelector} from "react-redux";
import {getIsProfileStatusCreating} from "../../../../../bll/profile.selector";
import {PreloaderLinear} from "../../../../commons/PreloaderLinear/PreloaderLinear";
import {EditableSpan} from "../../../../commons/EditableSpan/EditableSpan";
import {createStatusTC} from "../../../../../bll/profile.reducer";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../../../bll/snackbar.reducer";
import {useAppDispatch} from "../../../../../utils/hooks/useAppDispatch";

interface ProfileStatusProps {
    isMyAccount: boolean;
    status: string | null;
}

export const ProfileStatus: React.FC<ProfileStatusProps> = ({isMyAccount, status}) => {

    const isStatusCreating = useSelector(getIsProfileStatusCreating);
    const dispatch = useAppDispatch();

    const createStatusHandler = (status: null | string) => {
        dispatch(createStatusTC(status))
            .then(response => {
                dispatch(addSnackbarInfoMessage('Status updated!'));
            })
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

    return (
        <div className={s.profileStatus}>
            {isStatusCreating
                ? <PreloaderLinear />
                : <EditableSpan
                    disabled={!isMyAccount}
                    value={status}
                    defaultValue={'Click to create your status!'}
                    disabledDefaultValue={'Status not set.'}
                    placeholder={'Enter - create or Esc - cancel. Max 50 characters.'}
                    setValue={createStatusHandler}
                />}
        </div>
    );
};