import React from 'react';
import s from './Header.module.scss';
import {useSelector} from "react-redux";
import {getUsername} from "../../bll/selectors";
import logo from'../../assets/images/logo.png';
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAppInit: boolean
    isAuth: boolean
    logout: () => void
};

export const Header: React.FC<HeaderPropsType> = ({isAppInit, isAuth, logout}) => {

    const username = useSelector(getUsername);

    return (
        <div className={s.headerWrapper}>
            <div className='container'>
                <div className={s.logoWrapper}>
                    <NavLink to='/'>
                        <img src={logo} alt="logo"/>
                    </NavLink>
                </div>
                <h1>CHECKERS</h1>
                {isAppInit && isAuth
                    ? <div className={s.profile}>
                        <h3>{username}</h3>
                        <button onClick={logout}>logout</button>
                    </div>
                    : <div/>}
            </div>
        </div>
    );
};