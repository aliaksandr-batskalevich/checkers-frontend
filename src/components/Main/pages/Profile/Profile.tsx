import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import s from './Profile.module.scss';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../utils/hooks/useAppDispatch";
import {followProfileTC, getUserTC, unFollowProfileTC} from "../../../../bll/profile.reducer";
import {addSnackbarErrorMessage} from "../../../../bll/snackbar.reducer";
import {Preloader} from "../../../commons/Preloader/Preloader";
import {getAuthId} from "../../../../bll/auth.selector";
import {getIsProfileFetching, getIsProfileFollowing, getProfile} from "../../../../bll/profile.selector";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import {Avatar} from "./Avatar/Avatar";
import {FollowButton} from "../../../commons/FollowButton/FollowButton";
import {ProfileStatistics} from "./ProfileStatistics/ProfileStatistics";

export const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isProfileFetching = useSelector(getIsProfileFetching);
    const isFollowing = useSelector(getIsProfileFollowing);

    const authId = useSelector(getAuthId);
    const profile = useSelector(getProfile);
    const {id} = useParams<{ id: string }>();

    const isMyAccount = authId === profile?.id;

    const followHandler = () => {
        profile && dispatch(followProfileTC(profile.id))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

    const unFollowHandler = () => {
        profile && dispatch(unFollowProfileTC(profile.id))
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

    }, [id, authId, dispatch, navigate]);

    return (isProfileFetching || !profile
            ? <Preloader/>
            : <div className={s.profileWrapper}>
                <div className={s.profileInfo}>
                    <div className={s.firstColumn}>
                        <Avatar isMyAccount={isMyAccount}/>
                        {!isMyAccount
                        && <FollowButton
                            isFollowed={profile.isFollowed}
                            isFollowing={isFollowing}
                            follow={followHandler}
                            unfollow={unFollowHandler}
                        />}
                    </div>
                    <div className={s.secondColumn}>
                        <ProfileStatus isMyAccount={isMyAccount} status={profile.status}/>
                        <div className={s.profileInfoWrapper}>
                            <h3>Profile info</h3>
                            <p>username: <span>{profile.username}</span></p>
                            <p>subscribers: <span>{profile.subscribersCount}</span></p>
                        </div>
                        <ProfileStatistics
                            rating={profile.rating}
                            gamesJuniorCount={profile.gamesJuniorCount}
                            gamesJuniorWinsCount={profile.gamesJuniorWinsCount}
                            gamesMiddleCount={profile.gamesMiddleCount}
                            gamesMiddleWinsCount={profile.gamesMiddleWinsCount}
                            gamesSeniorCount={profile.gamesSeniorCount}
                            gamesSeniorWinsCount={profile.gamesSeniorWinsCount}
                            sparringCount={profile.sparringCount}
                            sparringWinsCount={profile.sparringWinsCount}
                        />
                    </div>
                </div>
            </div>
    );
};