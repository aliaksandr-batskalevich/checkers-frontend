import React, {useEffect} from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import s from './Profile.module.scss';
import {useSelector} from "react-redux";
import {getAuthId, getIsAuth, getProfile} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {getUserTC} from "../../../../bll/profile.reducer";

export const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isAuth = useSelector(getIsAuth);
    const authId = useSelector(getAuthId);
    const profile = useSelector(getProfile);
    const params = useParams<{ id: string }>();



    useEffect(() => {
        // to my profile
        isAuth && !params.id && authId !== profile?.id && authId
        && dispatch(getUserTC(authId));

        // to profile via params
        if (isAuth && params.id && +params.id !== profile?.id) {
            dispatch(getUserTC(+params.id))
                .catch((errorMessage) => {
                    navigate(`/404?message=${errorMessage}`);
                });
        }
    }, []);

    return (
        !isAuth
            ? <Navigate to={'/signin'}/>
            : <div className={s.profileWrapper}>
                {JSON.stringify(profile)};
            </div>
    );
};