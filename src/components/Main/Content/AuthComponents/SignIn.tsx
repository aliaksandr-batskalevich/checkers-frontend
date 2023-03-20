import React from 'react';
import {Navigate, NavLink} from "react-router-dom";
import s from './AuthComponents.module.scss';
import {useFormik} from "formik";
import {SignInRequestDataType} from "../../../../models/auth.request";
import {useAppDispatch} from "../../../../utils/hooks";
import {signInTC} from "../../../../bll/auth.reducer";
import {v1} from "uuid";
import {useSelector} from "react-redux";
import {getId, getIsAuth, getIsAuthing} from "../../../../bll/selectors";


export const SignIn = () => {

    const isAuthing = useSelector(getIsAuthing);
    const isAuth: boolean = useSelector(getIsAuth);
    const id = useSelector(getId);


    const dispatch = useAppDispatch();

    const initialSignInValues: SignInRequestDataType = {
        username: '',
        password: '',
    };

    const validate = (values: SignInRequestDataType) => {
        let errors: Partial<SignInRequestDataType> = {};

        if (!values.username.trim().length) {
            errors.username = `Field 'username' is required!`
        }

        if (!values.password.trim().length) {
            errors.password = `Field 'password' is required!`
        }

        return errors;
    };

    const onSubmit = (values: SignInRequestDataType) => {
        dispatch(signInTC(values.username, values.password))
            .then(() => {
                formik.resetForm();
            })
            .catch((reason => {
                // dispatch(setSnackBarErrorMessage(errorMessage));
            }));
    }

    const formik = useFormik({
        initialValues: initialSignInValues,
        onSubmit,
        validate,
    });

    const inputs = Object.keys(initialSignInValues);
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

    const isSubmitButtonDisabled = !!validate(formik.values).username || !!validate(formik.values).password || isAuthing;

    return (
        isAuth && id
            ? <Navigate to={`/profile/${id}`}/>
            : <div className={s.loginWrapper}>
                <h2>SIGN IN</h2>
                <form className={s.formWrapper} onSubmit={formik.handleSubmit}>
                    {inputsForRender}
                    <button type="submit" disabled={isSubmitButtonDisabled}>SIGN IN</button>
                    <div className={s.errorMessageField}>{errorMessagesToRender}</div>
                    <p className={s.navLinkText}><NavLink to='/signup'>Sign up</NavLink> if you don't have an account yet.</p>
                </form>
            </div>
    );
};