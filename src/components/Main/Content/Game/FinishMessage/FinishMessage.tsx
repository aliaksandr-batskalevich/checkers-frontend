import React from 'react';
import s from './FinishMessage.module.scss';

type FinishMessagePropsType = {
    message: string
    closeMessage: () => void
};

export const FinishMessage: React.FC<FinishMessagePropsType> = ({message, closeMessage}) => {

    return (
        <div className={s.finishMessageWrapper}>
            <h3>{message}</h3>
            <button onClick={closeMessage}>Close</button>
        </div>
    );
};