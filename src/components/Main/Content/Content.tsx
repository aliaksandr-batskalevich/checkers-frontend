import React from 'react';
import {Navigate, Routes, Route} from 'react-router-dom';
import s from './Content.module.scss';
import PageNotFound from "./PageNotFound/PageNotFound";
import {SignIn} from "./AuthComponents/SignIn";
import {SignUp} from "./AuthComponents/SignUp";
import Profile from "./Profile/Profile";
import Users from "./Users/Users";


export const Content = () => {

    return (
        <div className={s.contentWrapper}>
            <Routes>
                <Route path='/' element={<Profile/>} />
                <Route path='/profile/:id' element={(<Profile/>)} />
                <Route path='/users' element={<Users/>} />
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/404' element={<PageNotFound/>} />
                <Route path='/*' element={<Navigate to='/404'/>} />
            </Routes>
        </div>
    );
};