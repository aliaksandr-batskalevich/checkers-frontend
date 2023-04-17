import React from 'react';
import s from './MuteButton.module.scss';

type MutButtonPropsType = {
    isSounds: boolean
    switchSounds: (isSounds: boolean) => void
};

export const MuteButton: React.FC<MutButtonPropsType> = ({isSounds, switchSounds}) => {

    const switchIsSoundsHandler = () => {
        switchSounds(!isSounds);
    };

    return (
        isSounds
            ? <div className={s.withSound} onClick={switchIsSoundsHandler}/>
            : <div className={s.withoutSound} onClick={switchIsSoundsHandler}/>
    );
};