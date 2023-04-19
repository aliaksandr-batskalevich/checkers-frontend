import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import s from './Profile.module.scss';
import {useSelector} from "react-redux";
import {getAuthId, getIsProfileFetching, getIsProfileFollowing, getProfile} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {followProfileTC, getUserTC, unFollowProfileTC} from "../../../../bll/profile.reducer";
import defaultAvatar from '../../../../assets/images/default-avatar.png';
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {withAuthRedirect} from "../../../commons/HOCs/withAuthRedirect";
import {Preloader} from "../../../commons/Preloader/Preloader";

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const authId = useSelector(getAuthId);
    const isProfileFetching = useSelector(getIsProfileFetching);
    const isFollowing = useSelector(getIsProfileFollowing);
    const profile = useSelector(getProfile);
    const params = useParams<{ id: string }>();

    const isMyAccount = authId === profile?.id;


    const editAvatarHandler = () => {
        dispatch(addSnackbarInfoMessage('Feature under development.'));
    };

    const followHandler = () => {
        dispatch(followProfileTC(profile!.id))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

    const unFollowHandler = () => {
        dispatch(unFollowProfileTC(profile!.id))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

    useEffect(() => {

        // to my profile
        !params.id && authId
        && dispatch(getUserTC(authId));

        // to profile via params
        params.id
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
                            : <div className={s.followButtonsWrapper}>
                                {profile!.isFollowed
                                    ? <button
                                        className={s.followButton}
                                        onClick={unFollowHandler}
                                        disabled={isFollowing}
                                    >unFollow</button>
                                    : <button
                                        className={s.followButton}
                                        onClick={followHandler}
                                        disabled={isFollowing}
                                    >follow</button>}
                            </div>}
                    </div>
                    <div className={s.descriptions}>
                        <div className={s.profileInfoWrapper}>
                            <h3>Profile info</h3>
                            <p>username: <span>{profile?.username}</span></p>
                            <p>subscribers: <span>{profile?.subscribersCount}</span></p>
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