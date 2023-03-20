import React from 'react';
import s from './Main.module.scss';
import {Content} from "./Content/Content";

export const Main = () => {
    return (
        <div className={s.mainWrapper}>
            <Content/>
        </div>
    );
};