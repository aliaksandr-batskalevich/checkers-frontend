import React from 'react';
import s from './Navbar.module.scss';
import {NavLink} from "react-router-dom";

export const Navbar = () => {

    return (
        <div className={s.navbarWrapper}>
            <NavLink to='/'>Profile</NavLink>
            <NavLink to='/users'>Users</NavLink>
            <NavLink to='/top'>TOP-10</NavLink>
            <NavLink to='/game'>Game</NavLink>
            <NavLink to='/sparring'>Sparring</NavLink>
        </div>
    );
};