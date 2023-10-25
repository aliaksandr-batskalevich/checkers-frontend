import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import s from './Profile.module.scss';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../utils/hooks/useApDispatch";
import {createStatusTC, followProfileTC, getUserTC, unFollowProfileTC} from "../../../../bll/profile.reducer";
import defaultAvatar from '../../../../assets/images/default-avatar.png';
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {Preloader} from "../../../commons/Preloader/Preloader";
import {EditableSpan} from "../../../commons/EditableSpan/EditableSpan";
import {PreloaderLinear} from "../../../commons/PreloaderLinear/PreloaderLinear";
import {getAuthId} from "../../../../bll/auth.selector";
import {
    getIsProfileFetching,
    getIsProfileFollowing,
    getIsProfileStatusCreating,
    getProfile
} from "../../../../bll/profile.selector";

export const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isProfileFetching = useSelector(getIsProfileFetching);
    const isFollowing = useSelector(getIsProfileFollowing);
    const isStatusCreating = useSelector(getIsProfileStatusCreating);

    const authId = useSelector(getAuthId);
    const profile = useSelector(getProfile);
    const {id} = useParams<{ id: string }>();

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

    const createStatusHandler = (status: null | string) => {
        dispatch(createStatusTC(status))
            .then(response => {
                dispatch(addSnackbarInfoMessage('Status updated!'));
            })
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

    // FETCH profile
    useEffect(() => {

        // to my profile
        !id && authId && dispatch(getUserTC(authId));

        // to profile via params
        id && dispatch(getUserTC(+id))
            .catch((errorMessage) => {
                navigate(`/info?message=${errorMessage}`);
            });

    }, [id, dispatch, navigate]);

    return (isProfileFetching
            ? <Preloader/>
            : <div className={s.profileWrapper}>
                <div className={s.statusWrapper}>
                    {isStatusCreating
                        ? <PreloaderLinear />
                        : <EditableSpan
                            disabled={!isMyAccount}
                            value={profile!.status}
                            defaultValue={'Click to create your status!'}
                            disabledDefaultValue={'Status not set.'}
                            placeholder={'Enter - create or Esc - cancel. Max 50 characters.'}
                            setValue={createStatusHandler}
                        />}
                </div>
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
                            <p>gamesJuniorCount/Wins: <span>{`${profile?.gamesJuniorCount}/${profile?.gamesJuniorWinsCount}`}</span></p>
                            <p>gamesMiddleCount/Wins: <span>{`${profile?.gamesMiddleCount}/${profile?.gamesMiddleWinsCount}`}</span></p>
                            <p>gamesSeniorCount/Wins: <span>{`${profile?.gamesSeniorCount}/${profile?.gamesSeniorWinsCount}`}</span></p>
                            <p>sparringCount/Wins: <span>{`${profile?.sparringCount}/${profile?.sparringWinsCount}`}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    );
};