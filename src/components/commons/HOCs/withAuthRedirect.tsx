import React from "react";
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {getIsAuth} from "../../../bll/selectors";

export function withAuthRedirect<T>(Component: React.FC<any>) {
    return () => {
        const isAuth = useSelector(getIsAuth);

        return isAuth
            ? <Component />
            : <Navigate to='/signin' />;
    };
}