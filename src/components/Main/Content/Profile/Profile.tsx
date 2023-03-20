import React, {useEffect} from 'react';
import {Navigate, useParams} from "react-router-dom";
import s from './Profile.module.scss';
import {useSelector} from "react-redux";
import {getId, getIsAuth, getProfile} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {getUserTC} from "../../../../bll/profile.reducer";

export const Profile = () => {

    const dispatch = useAppDispatch();

    const isAuth = useSelector(getIsAuth);
    const authId = useSelector(getId);
    const profile = useSelector(getProfile);
    const params = useParams<{ id: string }>();

    useEffect(() => {
        // to my profile
        !params.id && authId !== profile?.id && authId
        && dispatch(getUserTC(authId));

        // to profile via params
        isAuth && params.id && +params.id !== profile?.id
        && dispatch(getUserTC(+params.id));
    }, [])

    return (
        !isAuth
            ? <Navigate to={'/signin'}/>
            : <div className={s.profileWrapper}>
                {JSON.stringify(profile)};
            </div>
    );
};