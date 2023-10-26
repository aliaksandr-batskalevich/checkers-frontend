import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './CustomInputField.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type CustomInputField = DefaultInputPropsType & {
    label?: string;
    error?: string;
    touched?: boolean;
}

export const CustomInputField: React.FC<CustomInputField> = (props) => {
    const {className, id, label, error, touched, ...inputProps} = props;

    const resultId = id || Math.random().toString();
    const resultClassName = `${s.customInputField} ${className}`;

    return (
        <div className={resultClassName}>
            {label && <label htmlFor={resultId}>{label}</label>}
            <input
                id={resultId}
                className={touched && error ? s.inputError : ''}
                {...inputProps}
            />
            <p>{touched && error}</p>
        </div>
    );
};