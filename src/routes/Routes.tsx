import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Profile} from "../components/Main/pages/Profile/Profile";
import {Users} from "../components/Main/pages/Users/Users";
import {TopUsers} from "../components/Main/pages/TopUsers/TopUsers";
import {Games} from "../components/Main/pages/Games/Games";
import {Game} from "../components/Main/pages/Game/Game";
import {Chat} from "../components/Main/pages/Chat/Chat";
import {SignIn} from "../components/Main/pages/AuthComponents/SignIn";
import {SignUp} from "../components/Main/pages/AuthComponents/SignUp";
import {InfoPage} from "../components/Main/pages/InfoPage/InfoPage";
import {useSelector} from "react-redux";
import {getIsActivated, getIsAuth} from "../bll/auth.selector";
import {withAuthRedirect} from "../utils/hoks/withAuthRedirect";
import {ActivateMessage} from "../components/Main/pages/ActivateMessage/ActivateMessage";

export const AppRoutes = () => {

    const isActivated = useSelector(getIsActivated);
    const isAuth = useSelector(getIsAuth);

    if (isAuth && !isActivated) return <ActivateMessage/>;


    // AUTH PROTECTED COMPONENTS
    const ProfileWithAuthRedirect = withAuthRedirect(Profile);
    const UsersWithAuthRedirect = withAuthRedirect(Users);
    const TopUsersWithAuthRedirect = withAuthRedirect(TopUsers);
    const GamesWithAuthRedirect = withAuthRedirect(Games);
    const GameWithAuthRedirect = withAuthRedirect(Game);
    const ChatWithAuthRedirect = withAuthRedirect(Chat);

    return (
        <Routes>
            <Route path='/' element={<Navigate to='/profile'/>}/>
            <Route path='/profile' element={<ProfileWithAuthRedirect/>}/>
            <Route path='/profile/:id' element={<ProfileWithAuthRedirect/>}/>
            <Route path='/users' element={<UsersWithAuthRedirect/>}/>
            <Route path='/top' element={<TopUsersWithAuthRedirect/>}/>
            <Route path='/games' element={<GamesWithAuthRedirect/>}/>
            <Route path='/games/:id' element={<GameWithAuthRedirect/>}/>
            <Route path='/chat' element={<ChatWithAuthRedirect/>}/>
            <Route path='/signin' element={!isAuth ? <SignIn/> : <Navigate to='/'/>}/>
            <Route path='/signup' element={!isAuth ? <SignUp/> : <Navigate to='/'/>}/>
            <Route path='/info' element={<InfoPage/>}/>
            <Route path='/*' element={<Navigate to='/info?code=404&message=Page%20not%20found'/>}/>
        </Routes>
    );
};