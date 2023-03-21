import React, {useEffect} from 'react';
import s from './App.module.scss';
import {Main} from "./components/Main/Main";
import {useAppDispatch} from "./utils/hooks";
import {logoutTC, refreshTC} from "./bll/auth.reducer";
import {useSelector} from "react-redux";
import {getIsActivated, getIsAppInit, getIsAuth} from "./bll/selectors";
import {setIsAppInit} from "./bll/app.reducer";
import {Preloader} from "./components/commons/Preloader/Preloader";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {ActivateMessage} from "./components/ActivateMessage/ActivateMessage";

function App() {
    // refresh APP
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(refreshTC())
                .finally(() => {
                    dispatch(setIsAppInit(true));
                });
        } else {
            dispatch(setIsAppInit(true));
        }
    }, []);

    const isAppInit = useSelector(getIsAppInit);
    const isAuth = useSelector(getIsAuth);
    const isActivated = useSelector(getIsActivated);

    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        const pr = dispatch(logoutTC());
    };

    return (
        <div className={s.appWrapper}>
            <Header isAppInit={isAppInit} isAuth={isAuth} logout={logoutHandler}/>
            {isAppInit
                ? isAuth && !isActivated
                    ? <ActivateMessage/>
                    : <Main/>
                : <Preloader/>}
            <Footer/>
        </div>
    );
}

export default App;
