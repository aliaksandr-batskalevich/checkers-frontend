import React from 'react';
import s from './App.module.scss';
import {Main} from "./components/Main/Main";
import {Preloader} from "./components/commons/Preloader/Preloader";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Snackbar} from "./components/Snackbar/Snackbar";
import {useSelector} from "react-redux";
import {getIsAppInit} from "./bll/app.selector";
import {useAppInit} from "./utils/hooks/useAppInit";

function App() {

    useAppInit();
    const isAppInit = useSelector(getIsAppInit);

    return (
        <div className={s.appWrapper}>
            <Header/>
            {isAppInit ? <Main/> : <Preloader/>}
            <Footer/>
            <Snackbar/>
        </div>
    );
}

export default App;
