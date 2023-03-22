import React, {useEffect} from 'react';
import {withAuthRedirect} from "../../../commons/HOCs/withAuthRedirect";
import s from './Users.module.scss';
import {useSelector} from "react-redux";
import {getCountOnPage, getCurrentPage, getTotalPage, getUsers} from "../../../../bll/selectors";
import {useAppDispatch} from "../../../../utils/hooks";
import {getUsersTC, setCurrentPage} from "../../../../bll/users.reducer";
import {addSnackbarErrorMessage} from "../../../../bll/snackbar.reducer";
import SuperPaginator from "./Paginator/SuperPaginator";

const Users = () => {
    const dispatch = useAppDispatch();
    const countOnPage = useSelector(getCountOnPage);
    const currentPage = useSelector(getCurrentPage);
    const totalPage = useSelector(getTotalPage);
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

    return (
        <div className={s.usersWrapper}>
            <SuperPaginator
                viewPagesOddNumber={9}
                pageJumpPositive={10}
                countOnPage={countOnPage}
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPageHandler}
            />
            {JSON.stringify(users)}
        </div>
    );
};

export default withAuthRedirect(Users);