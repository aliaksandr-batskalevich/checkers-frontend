import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './EditableSpan.module.scss';

type EditableSpanPropsType = {
    disabled: boolean
    value: null | string
    defaultValue: string
    disabledDefaultValue?: string
    placeholder: string
    setValue: (value: null | string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({disabled, value, defaultValue, disabledDefaultValue, placeholder, setValue}) => {

    const [isEditor, setIsEditor] = useState<boolean>(false);
    const [newText, setNewText] = useState<string>(value ?? '');


    const activateEditorHandler = () => {
        !disabled && setIsEditor(true);
    };

    const cancelIsEditor = () => {
        setNewText(value ?? '');
        setIsEditor(false);
    };

    const setValueHandler = () => {
        const newValue = newText.trim() || null;
        setValue(newValue);
    };

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.currentTarget.value.length <= 50 && setNewText(event.currentTarget.value);
    };

    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && setValueHandler();
        event.key === 'Escape' && cancelIsEditor();
    };

    const onBlurInputHandler = () => {
        cancelIsEditor();
    };

    const statusToRender = value ?? (disabled ? disabledDefaultValue : defaultValue);

    return (
        <div className={s.editableSpanWrapper}>
            {isEditor
                ? <input
                    type="text"
                    placeholder={placeholder}
                    value={newText}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownInputHandler}
                    onBlur={onBlurInputHandler}
                    autoFocus
                />
                : <span onDoubleClick={activateEditorHandler}>{statusToRender}</span>}
        </div>
    );
};