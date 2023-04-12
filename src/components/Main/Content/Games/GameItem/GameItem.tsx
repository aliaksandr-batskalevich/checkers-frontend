import React from 'react';
import s from './GameItem.module.scss';
import wonLogo from '../../../../../assets/images/wonLogo.png';
import processLogo from '../../../../../assets/images/processLogo.png';
import finishLogo from '../../../../../assets/images/finishLogo.png';
import {IGameItemType} from "../../../../../models/IGameItem";

type GameItemPropsType = IGameItemType & {continueGame: (id: number) => void};

export const GameItem: React.FC<GameItemPropsType> = ({id, timeStart, timeEnd, level, isWon, continueGame}) => {

    const continueGameHandler = () => {
        continueGame(id);
    };

    const dateStartObj = new Date(timeStart);
    const timeStartLocale = dateStartObj.toLocaleTimeString();
    const dateStartLocale = dateStartObj.toLocaleDateString();

    let timeEndLocale = '';
    let dateEndLocale = '';

    if (timeEnd) {
        const dateEndObj = new Date(timeEnd);
        timeEndLocale = dateEndObj.toLocaleTimeString();
        dateEndLocale = dateEndObj.toLocaleDateString();
    }

    const gameLogo = !!timeEnd ? finishLogo : processLogo;

    return (

        <div className={s.gameItemWrapper}>
            <div className={s.logoWrapper}>
                <img src={gameLogo} alt="gameLogo"/>
            </div>
            <div className={s.descriptionWrapper}>
                <div className={s.info}>
                    <h3>{`${id} - level ${level}`}</h3>
                    <p>
                        Started:
                        <span>{`${timeStartLocale}, ${dateStartLocale}`}</span>
                    </p>
                    {!!timeEnd
                        ? <p>
                            Finished:
                            <span>{`${timeEndLocale}, ${dateEndLocale}`}</span>
                        </p>
                        : <button onClick={continueGameHandler}>continue game</button>}
                </div>
                <div className={s.logoWrapper}>
                    {isWon && <img src={wonLogo} alt="wonLogo"/>}
                </div>
            </div>
        </div>
    );
};