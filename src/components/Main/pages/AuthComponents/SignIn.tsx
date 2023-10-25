import React from 'react';
import {NavLink} from "react-router-dom";
import s from './AuthComponents.module.scss';
import {useFormik} from "formik";
import {SignInRequestDataType} from "../../../../models/requests/auth.request";
import {useAppDispatch} from "../../../../utils/hooks/useApDispatch";
import {signInTC} from "../../../../bll/auth.reducer";
import {v1} from "uuid";
import {useSelector} from "react-redux";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {getIsAuthing} from "../../../../bll/auth.selector";
import {requiredValidator} from "../../../../utils/validators/required.validator";


export const SignIn = () => {

    const isAuthing = useSelector(getIsAuthing);

    const dispatch = useAppDispatch();

    const initialValues: SignInRequestDataType = {
        username: '',
        password: '',
    };

    const validate = (values: SignInRequestDataType) => {
        const errors: Partial<SignInRequestDataType> = {};

        const usernameError = requiredValidator(values.username);
        if (usernameError) errors.username = usernameError;

        const passwordError = requiredValidator(values.password);
        if (passwordError) errors.password = passwordError;

        return errors;
    };

    const onSubmit = (values: SignInRequestDataType) => {
        dispatch(signInTC(values.username.trim(), values.password.trim()))
            .then((message) => {
                formik.resetForm();
                dispatch(addSnackbarInfoMessage(message));
            })
            .catch((reason => {
                dispatch(addSnackbarErrorMessage(reason));
            }));
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,
    });

    const inputs = Object.keys(initialValues);
    const inputsForRender = inputs.map((key, index) => {

        // @ts-ignore
        const inputErrorClass = formik.touched[key] && formik.errors[key] ? s.inputError : '';

        return <div key={index} className={s.field}>
            <input
                id={key}
                className={inputErrorClass}
                type={key === 'password' ? 'password' : 'text'}
                placeholder={key}
                {...formik.getFieldProps(key)}
            />
        </div>
    });

    const errorKeys = Object.keys(formik.errors);
    const errorValues = Object.values(formik.errors);

    const errorMessagesToRender = errorValues
        // @ts-ignore
        .map((error, index) => formik.touched[errorKeys[index]] && <p key={v1()}>{error}</p>)
        .filter(error => error);

    const isSubmitButtonDisabled = !!Object.keys(validate(formik.values)).length || isAuthing;

    return (
        <div className={s.loginWrapper}>
            <h2>SIGN IN</h2>
            <form className={s.formWrapper} onSubmit={formik.handleSubmit}>
                {inputsForRender}
                <button type="submit" disabled={isSubmitButtonDisabled}>SIGN IN</button>
                <div className={s.errorMessageField}>{errorMessagesToRender}</div>
                <p className={s.navLinkText}><NavLink to='/signup'>Sign up</NavLink> if you don't have an account yet.
                </p>
            </form>
        </div>
    );
};