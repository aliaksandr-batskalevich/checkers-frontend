import React from 'react';
import s from './PaginatorButton.module.css';

type PaginatorButtonType = 'toFirst' | 'toLast' | 'jumpDownByOne' | 'jumpUpByOne' | 'jumpDownBig' | 'jumpUpBig';
type PaginatorButtonPropsType = {
    buttonType: PaginatorButtonType
    onClick: () => void
}

export const PaginatorButton: React.FC<PaginatorButtonPropsType> = ({buttonType, onClick}) => {

    const elementMaker = (buttonType: PaginatorButtonType) => {
        switch (buttonType) {
            case 'jumpUpByOne': return '>';
            case 'jumpDownByOne': return '<';
            case 'jumpUpBig': return '>>';
            case 'jumpDownBig': return '<<';
            case 'toFirst': return '❘<';
            case 'toLast': return '>❘';
            // default: return 'Error';
        }
    };

    let element = elementMaker(buttonType);

    return (
        <div className={s.commonClass} onClick={onClick}>
            {element}
        </div>
    );
};