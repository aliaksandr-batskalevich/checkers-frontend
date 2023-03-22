import React from 'react';
import s from './AuthComponents.module.scss';
import {useFormik} from "formik";
import {SignUpRequestDataType} from "../../../../models/auth.request";
import {useAppDispatch} from "../../../../utils/hooks";
import {signUpTC} from "../../../../bll/auth.reducer";
import {v1} from "uuid";
import {useSelector} from "react-redux";
import {getIsAuth, getIsAuthing} from "../../../../bll/selectors";
import {Navigate, NavLink} from "react-router-dom";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";

type SignUpValuesType = SignUpRequestDataType & {confirmPassword: string};

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SignUp = () => {

    const isAuthing = useSelector(getIsAuthing);
    const isAuth: boolean = useSelector(getIsAuth);

    const dispatch = useAppDispatch();

    const initialValues: SignUpValuesType = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validate = (values: SignUpValuesType) => {
        let errors: Partial<SignUpValuesType> = {};

        if (values.username.trim().length <= 4 && values.username.trim().length >= 15) {
            errors.username = `Username must be between 4 and 15 characters long!`;
        }

        if (!emailRegex.test(values.email)) {
            errors.email = `Incorrect email!`;
        }

        if (values.password.trim().length <= 4 && values.password.trim().length >= 10) {
            errors.password = `Username must be between 4 and 10 characters long!`;
        }

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
        isAuth
            ? <Navigate to={`/`}/>
            : <div className={s.loginWrapper}>
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