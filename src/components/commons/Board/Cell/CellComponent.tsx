import React, {FC} from 'react';
import s from './CellComponent.module.scss';
import {Colors} from "../../../../models/game/Colors";
import {Cell} from "../../../../models/game/Cell";

interface CellComponentPropsType {
    cell: Cell
    isSelected: boolean

    cellOnClick: (cell: Cell) => void
}

export const CellComponent: FC<CellComponentPropsType> = ({cell, isSelected, cellOnClick}) => {

    const cellOnClickHandler = () => {
        cellOnClick(cell);
    };

    const colorClassName = isSelected
        ? s.selected
        : cell.isDanger && cell.figure
            ? s.crush
            : cell.color === Colors.WHITE
                ? s.white
                : s.black;

    const selectedClassName = isSelected ? s.selected : '';
    const forwardClassName = cell.isForward ? s.forward : '';

    const rootClassName = [
        s.cellWrapper,
        colorClassName,
        forwardClassName,
        selectedClassName,
    ].join(' ');

    const isAvailable = !cell.figure && cell.isAvailable;

    const figure = cell.figure?.logo ? <img src={cell.figure.logo} alt="figure"/> : null;

    return (
        <div className={rootClassName} onClick={cellOnClickHandler}>
            {isAvailable && <div className={s.available}/>}
            {figure}
        </div>
    );
};