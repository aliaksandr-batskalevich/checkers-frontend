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
import {useNavigate} from "react-router-dom";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "./bll/snackbar.reducer";
import {Snackbar} from "./components/Snackbar/Snackbar";

function App() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAppInit = useSelector(getIsAppInit);
    const isAuth = useSelector(getIsAuth);
    const isActivated = useSelector(getIsActivated);

    const logoutHandler = () => {
        dispatch(logoutTC())
            .then((message) => {
                navigate('/signin');
                dispatch(addSnackbarInfoMessage(message));
            })
            .catch(reason => {
                dispatch(addSnackbarErrorMessage(reason));
            });
    };

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
    }, [dispatch]);

    return (
        <div className={s.appWrapper}>
            <Header isAppInit={isAppInit} isAuth={isAuth} logout={logoutHandler}/>
            {isAppInit
                ? isAuth && !isActivated
                    ? <ActivateMessage/>
                    : <Main/>
                : <Preloader/>}
            <Footer/>
            <Snackbar/>
        </div>
    );
}

export default App;
