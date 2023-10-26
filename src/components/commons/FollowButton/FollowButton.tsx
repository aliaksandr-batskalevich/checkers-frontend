import React from 'react';
import s from './FollowButton.module.scss';

interface FollowButtonProps {
    isFollowed: boolean;
    follow: () => void;
    unfollow: () => void;
    isFollowing: boolean;
}

export const FollowButton: React.FC<FollowButtonProps> = ({isFollowed, follow, unfollow, isFollowing}) => {


    return (
        <div className={s.followButtonWrapper}>
            {isFollowed
                ? <button
                    className={s.followButton}
                    onClick={unfollow}
                    disabled={isFollowing}
                >unFollow</button>
                : <button
                    className={s.followButton}
                    onClick={follow}
                    disabled={isFollowing}
                >follow</button>}
        </div>
    );
};