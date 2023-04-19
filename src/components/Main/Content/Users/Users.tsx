import React, {useEffect} from 'react';
import {withAuthRedirect} from "../../../commons/HOCs/withAuthRedirect";
import s from './Users.module.scss';
import {useSelector} from "react-redux";
import {
    getAuthId,
    getIsUsersFetching,
    getUsers,
    getUsersCountOnPage,
    getUsersCurrentPage,
    getUsersIdFollowing,
    getUsersTotalPageCount
} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {followUserTC, getUsersTC, setUsersCurrentPage, unFollowUserTC} from "../../../../bll/users.reducer";
import {addSnackbarErrorMessage} from "../../../../bll/snackbar.reducer";
import SuperPaginator from "./Paginator/SuperPaginator";
import {User} from "./User/User";
import {Preloader} from "../../../commons/Preloader/Preloader";

const Users = () => {
    const dispatch = useAppDispatch();

    const authId= useSelector(getAuthId);
    const countOnPage = useSelector(getUsersCountOnPage);
    const currentPage = useSelector(getUsersCurrentPage);
    const totalPageCount = useSelector(getUsersTotalPageCount);
    const isUsersFetching = useSelector(getIsUsersFetching);
    const usersIdFollowing = useSelector(getUsersIdFollowing);
    const users = useSelector(getUsers);

    const setCurrentPageHandler = (currentPage: number) => {
        dispatch(setUsersCurrentPage(currentPage));
    };

    const followHandler = (id: number) => {
        dispatch(followUserTC(id))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

    const unFollowHandler = (id: number) => {
        dispatch(unFollowUserTC(id))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

    const isUserFollowingTester = (id: number) => {
        return usersIdFollowing.includes(id);
    };

    useEffect(() => {
        dispatch(getUsersTC(countOnPage, currentPage))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    }, [dispatch, countOnPage, currentPage]);


    const usersToRender = users.map(user => <User
        key={user.id}
        authId={authId}
        isFollowing={isUserFollowingTester(user.id)}
        follow={followHandler}
        unFollow={unFollowHandler}
        {...user}
    />);

    return (
        <div className={s.usersWrapper}>
            <SuperPaginator
                viewPagesOddNumber={9}
                pageJumpPositive={10}
                currentPage={currentPage}
                totalPage={totalPageCount}
                setCurrentPage={setCurrentPageHandler}
            />
            {isUsersFetching
                ? <Preloader/>
                : usersToRender}
        </div>
    );
};

export default withAuthRedirect(Users);