import React, {useEffect} from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import s from './Profile.module.scss';
import {useSelector} from "react-redux";
import {getAuthId, getIsAuth, getProfile} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {getUserTC} from "../../../../bll/profile.reducer";
import defaultAvatar from '../../../../assets/images/default-avatar.png';
import {addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {withAuthRedirect} from "../../../commons/HOCs/withAuthRedirect";

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isAuth = useSelector(getIsAuth);
    const authId = useSelector(getAuthId);
    const profile = useSelector(getProfile);
    const params = useParams<{ id: string }>();

    const isMyAccount = authId === profile?.id;

    const editAvatarHandler = () => {
      dispatch(addSnackbarInfoMessage('Feature under development.'));
    };

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
    }, [isAuth, params.id, authId, profile, dispatch, navigate]);

    return (
            <div className={s.profileWrapper}>
                <div className={s.profileInfo}>
                    <div className={s.avatarWrapper}>
                        <img src={defaultAvatar} alt="avatar"/>
                        {isMyAccount && <button onClick={editAvatarHandler}>edit</button>}
                    </div>
                    <div className={s.descriptions}>
                        <div className={s.profileInfoWrapper}>
                            <h3>Profile info</h3>
                            <p>username: <span>{profile?.username}</span></p>
                        </div>

                        <div className={s.statistics}>
                            <h3>Statistics</h3>
                            <p>dashboardPosition: <span>{`In progress...`}</span></p>
                            <p>gamesCount/Wins: <span>{`${profile?.gamesCount}/${profile?.gamesWinsCount}`}</span></p>
                            <p>sparringCount/Wins: <span>{`${profile?.sparringCount}/${profile?.sparringWinsCount}`}</span></p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default withAuthRedirect(Profile);