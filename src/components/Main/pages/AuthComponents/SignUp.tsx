import React from 'react';
import s from './AuthComponents.module.scss';
import {useFormik} from "formik";
import {SignUpRequestDataType} from "../../../../models/requests/auth.request";
import {useAppDispatch} from "../../../../utils/hooks/useAppDispatch";
import {signUpTC} from "../../../../bll/auth.reducer";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {getIsAuthing} from "../../../../bll/auth.selector";
import {usernameValidator} from "../../../../utils/validators/userName.validator";
import {passwordValidator} from "../../../../utils/validators/password.validator";
import {emailValidator} from "../../../../utils/validators/email.validator";
import {CustomInputField} from "../../../commons/CustomInputField/CustomInputField";

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

    const isSubmitButtonDisabled = !!Object.keys(validate(formik.values)).length || isAuthing;

    return (
        <div className={s.loginWrapper}>
            <h2>SIGN UP</h2>
            <form className={s.formWrapper} onSubmit={formik.handleSubmit}>
                <div className={s.fieldsWrapper}>
                    <CustomInputField
                        placeholder='username'
                        touched={formik.touched.username}
                        error={formik.errors.username}
                        {...formik.getFieldProps('username')}
                    />
                    <CustomInputField
                        placeholder='email'
                        type='email'
                        touched={formik.touched.email}
                        error={formik.errors.email}
                        {...formik.getFieldProps('email')}
                    />
                    <CustomInputField
                        placeholder='password'
                        type='password'
                        touched={formik.touched.password}
                        error={formik.errors.password}
                        {...formik.getFieldProps('password')}
                    />
                    <CustomInputField
                        placeholder='confirm your password'
                        type='password'
                        touched={formik.touched.confirmPassword}
                        error={formik.errors.confirmPassword}
                        {...formik.getFieldProps('confirmPassword')}
                    />
                </div>
                <button type="submit" disabled={isSubmitButtonDisabled}>SIGN UP</button>
                <p className={s.navLinkText}><Link to='/sign-in'>Sign in</Link> if you already have an account.</p>
            </form>
        </div>
    );
};