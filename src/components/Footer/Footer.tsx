import React from 'react';
import s from './Footer.module.scss';

export const Footer = () => {
    return (
        <div className={s.footerWrapper}>
            <div className={'container'}>
                <p className={s.copyRight}>Copyright 2023</p>
            </div>
        </div>
    );
};