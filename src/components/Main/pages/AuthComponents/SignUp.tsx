import React from 'react';
import s from './AuthComponents.module.scss';
import {useFormik} from "formik";
import {SignUpRequestDataType} from "../../../../models/requests/auth.request";
import {useAppDispatch} from "../../../../utils/hooks/useApDispatch";
import {signUpTC} from "../../../../bll/auth.reducer";
import {v1} from "uuid";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {getIsAuthing} from "../../../../bll/auth.selector";
import {usernameValidator} from "../../../../utils/validators/userName.validator";
import {passwordValidator} from "../../../../utils/validators/password.validator";
import {emailValidator} from "../../../../utils/validators/email.validator";

type SignUpValuesType = SignUpRequestDataType & { confirmPassword: string };


export const SignUp = () => {

    const isAuthing = useSelector(getIsAuthing);

    const dispatch = useAppDispatch();

    const initialValues: SignUpValuesType = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validate = (values: SignUpValuesType) => {
        const errors: Partial<SignUpValuesType> = {};

        const usernameError = usernameValidator(values.username);
        if (usernameError) errors.username = usernameError;

        const emailError = emailValidator(values.email);
        if (emailError)  errors.email = emailError;

        const passwordError = passwordValidator(values.password);
        if (passwordError) errors.password = passwordError;

        if (values.password.trim() !== values.confirmPassword.trim()) {
            errors.confirmPassword = `You have not confirmed your password!`;
        }

        return errors;
    };

    const onSubmit = (values: SignUpValuesType) => {
        dispatch(signUpTC(values.username.trim(), values.email, values.password.trim()))
            .then((message) => {
                formik.resetForm();
                dispatch(addSnackbarInfoMessage(message));
            })
            .catch((reason => {
                dispatch(addSnackbarErrorMessage(reason));
            }));
    };

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
                type={key.toLowerCase().indexOf('password') > -1 ? 'password' : 'text'}
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
            <h2>SIGN UP</h2>
            <form className={s.formWrapper} onSubmit={formik.handleSubmit}>
                {inputsForRender}
                <button type="submit" disabled={isSubmitButtonDisabled}>SIGN UP</button>
                <div className={s.errorMessageField}>{errorMessagesToRender}</div>
                <p className={s.navLinkText}><NavLink to='/signin'>Sign in</NavLink> if you already have an account.</p>
            </form>
        </div>
    );
};