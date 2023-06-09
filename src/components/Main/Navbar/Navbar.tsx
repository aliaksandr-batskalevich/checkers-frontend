import React from 'react';
import './notActive.scss';
import s from './Navbar.module.scss';
import {NavLink} from "react-router-dom";

export const Navbar = () => {

    return (
        <div className={s.navbarWrapper}>
            <NavLink to='/profile' className={({isActive}) => isActive ? s.activeLink : ''}>Profile</NavLink>
            <NavLink to='/users' className={({isActive}) => isActive ? s.activeLink : ''}>Users</NavLink>
            <NavLink to='/top' className={({isActive}) => isActive ? s.activeLink : ''}>TOP-10</NavLink>
            <NavLink to='/games' className={({isActive}) => isActive ? s.activeLink : ''}>Games</NavLink>
            <NavLink id='notActive' to='/sparring' className={({isActive}) => isActive ? s.activeLink : ''}>Sparring</NavLink>
            <NavLink to='/chat' className={({isActive}) => isActive ? s.activeLink : ''}>Chat</NavLink>
        </div>
    );
};