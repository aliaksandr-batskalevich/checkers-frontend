import React, {useEffect} from 'react';
import {withAuthRedirect} from "../../../commons/HOCs/withAuthRedirect";
import s from './Users.module.scss';
import {useSelector} from "react-redux";
import {getCountOnPage, getCurrentPage, getIsUsersFetching, getTotalPage, getUsers} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {getUsersTC, setCurrentPage} from "../../../../bll/users.reducer";
import {addSnackbarErrorMessage} from "../../../../bll/snackbar.reducer";
import SuperPaginator from "./Paginator/SuperPaginator";
import {User} from "./User/User";
import {Preloader} from "../../../commons/Preloader/Preloader";

const Users = () => {
    const dispatch = useAppDispatch();
    const countOnPage = useSelector(getCountOnPage);
    const currentPage = useSelector(getCurrentPage);
    const totalPage = useSelector(getTotalPage);
    const isUsersFetching = useSelector(getIsUsersFetching);
    const users = useSelector(getUsers);

    const setCurrentPageHandler = (currentPage: number) => {
        dispatch(setCurrentPage(currentPage));
    };

    useEffect(() => {
        dispatch(getUsersTC(countOnPage, currentPage))
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    }, [dispatch, countOnPage, currentPage]);

    const usersToRender = users.map(user => <User key={user.id} {...user} />);

    return (
        <div className={s.usersWrapper}>
            <SuperPaginator
                viewPagesOddNumber={9}
                pageJumpPositive={10}
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPageHandler}
            />
            {isUsersFetching
                ? <Preloader/>
                : usersToRender}
        </div>
    );
};

export default withAuthRedirect(Users);