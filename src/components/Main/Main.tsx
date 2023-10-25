import React from 'react';
import s from './Main.module.scss';
import {Navbar} from "./Navbar/Navbar";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../bll/auth.selector";
import {AppRoutes} from "../../routes/Routes";

export const Main = () => {

    const isAuth = useSelector(getIsAuth);

    return (
        <div className={s.mainWrapper}>
            <div className='container'>
                {isAuth && <Navbar/>}
                <div className={s.content}>
                    <AppRoutes/>
                </div>
            </div>
        </div>
    );
};