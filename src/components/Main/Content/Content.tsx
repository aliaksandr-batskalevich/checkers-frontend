import React from 'react';
import {Routes, Route} from 'react-router-dom';
import s from './Content.module.scss';
import {SignIn} from "./AuthComponents/SignIn";
import {SignUp} from "./AuthComponents/SignUp";
import {Profile} from "./Profile/Profile";

export const Content = () => {
    return (
        <div className={s.contentWrapper}>
            <Routes>
                <Route path='/' element={<Profile/>} />
                <Route path='/profile/:id' element={<Profile/>} />
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
            </Routes>
        </div>
    );
};