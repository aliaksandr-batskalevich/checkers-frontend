import React from 'react';
import s from './Logo.module.scss';
import logo from "../../../assets/images/logo.png";
import {Link} from "react-router-dom";

export const Logo = () => {
    return (
        <div className={s.logo}>
            <Link to='/'>
                <img src={logo} alt="logo"/>
            </Link>
        </div>
    );
};