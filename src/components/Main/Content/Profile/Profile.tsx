import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import s from './Profile.module.scss';
import {useSelector} from "react-redux";
import {getAuthId, getIsProfileFetching, getProfile} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {getUserTC} from "../../../../bll/profile.reducer";
import defaultAvatar from '../../../../assets/images/default-avatar.png';
import {addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {withAuthRedirect} from "../../../commons/HOCs/withAuthRedirect";
import {Preloader} from "../../../commons/Preloader/Preloader";

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const authId = useSelector(getAuthId);
    const isProfileFetching = useSelector(getIsProfileFetching);
    const profile = useSelector(getProfile);
    const params = useParams<{ id: string }>();

    const isMyAccount = authId === profile?.id;


    const editAvatarHandler = () => {
        dispatch(addSnackbarInfoMessage('Feature under development.'));
    };
    const followHandler = () => {
        dispatch(addSnackbarInfoMessage(`Feature under development.`));
    };

    useEffect(() => {

        // to my profile
        !params.id && authId
        && dispatch(getUserTC(authId));

        // to profile via params
        params.id && +params.id !== profile?.id
        && dispatch(getUserTC(+params.id))
            .catch((errorMessage) => {
                navigate(`/404?message=${errorMessage}`);
            });

    }, [params.id, dispatch]);

    return (isProfileFetching
            ? <Preloader/>
            : <div className={s.profileWrapper}>
                <div className={s.profileInfo}>
                    <div className={s.avatarWrapper}>
                        <img src={defaultAvatar} alt="avatar"/>
                        {isMyAccount
                            ? <button className={s.editButton} onClick={editAvatarHandler}>edit</button>
                            : <button className={s.followButton} onClick={followHandler}>follow</button>}
                    </div>
                    <div className={s.descriptions}>
                        <div className={s.profileInfoWrapper}>
                            <h3>Profile info</h3>
                            <p>username: <span>{profile?.username}</span></p>
                            <p>followers: <span>{'In progress...'}</span></p>
                        </div>

                        <div className={s.statistics}>
                            <h3>Statistics</h3>
                            <p>Rating: <span>{profile?.rating}</span></p>
                            <p>gamesCount/Wins: <span>{`${profile?.gamesCount}/${profile?.gamesWinsCount}`}</span></p>
                            <p>sparringCount/Wins: <span>{`${profile?.sparringCount}/${profile?.sparringWinsCount}`}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default withAuthRedirect(Profile);