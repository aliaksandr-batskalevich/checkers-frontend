import React from 'react';
import s from './Main.module.scss';
import {Navbar} from "./Navbar/Navbar";
import {useSelector} from "react-redux";
import {getIsActivated, getIsAuth} from "../../bll/auth.selector";
import {AppRoutes} from "../../routes/Routes";

export const Main = () => {

    const isAuth = useSelector(getIsAuth);
    const isActivated = useSelector(getIsActivated);

    return (
        <div className={s.mainWrapper}>
            <div className='container'>
                {isAuth && isActivated && <Navbar/>}
                <div className={s.content}>
                    <AppRoutes/>
                </div>
            </div>
        </div>
    );
};