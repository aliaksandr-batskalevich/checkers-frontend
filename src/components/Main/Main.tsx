import React from 'react';
import s from './Main.module.scss';
import {Content} from "./Content/Content";
import {Navbar} from "./Navbar/Navbar";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../bll/selectors";

export const Main = () => {

    const isAuth = useSelector(getIsAuth);

    return (
        <div className={s.mainWrapper}>
            <div className='container'>
                {isAuth && <Navbar/>}
                <Content/>
            </div>
        </div>
    );
};