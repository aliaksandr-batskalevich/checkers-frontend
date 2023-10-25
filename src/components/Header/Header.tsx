import React from 'react';
import s from './Header.module.scss';
import {ProfileBox} from "./ProfileBox/ProfileBox";
import {Logo} from "./Logo/Logo";
import {useSelector} from "react-redux";
import {getIsAppInit} from "../../bll/app.selector";
import {getIsAuth} from "../../bll/auth.selector";


export const Header = () => {

    const isAppInit = useSelector(getIsAppInit);
    const isAuth = useSelector(getIsAuth);


    return (
        <div className={s.headerWrapper}>
            <div className='container'>
                <div className={s.flexWrapper}>
                    <Logo/>
                    <h1>CHECKERS</h1>
                    {isAppInit && isAuth
                        ? <ProfileBox/>
                        : <div/>}
                </div>
            </div>
        </div>
    );
};