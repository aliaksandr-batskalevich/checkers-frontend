import React from 'react';
import {Link} from "react-router-dom";
import s from './AuthComponents.module.scss';
import {useFormik} from "formik";
import {SignInRequestDataType} from "../../../../models/requests/auth.request";
import {useAppDispatch} from "../../../../utils/hooks/useAppDispatch";
import {signInTC} from "../../../../bll/auth.reducer";
import {useSelector} from "react-redux";
import {addSnackbarErrorMessage, addSnackbarInfoMessage} from "../../../../bll/snackbar.reducer";
import {getIsAuthing} from "../../../../bll/auth.selector";
import {requiredValidator} from "../../../../utils/validators/required.validator";
import {CustomInputField} from "../../../commons/CustomInputField/CustomInputField";


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


    const isSubmitButtonDisabled = !!Object.keys(validate(formik.values)).length || isAuthing;

    return (
        <div className={s.loginWrapper}>
            <h2>SIGN IN</h2>
            <form className={s.formWrapper} onSubmit={formik.handleSubmit}>
                <div className={s.fieldsWrapper}>
                    <CustomInputField
                        placeholder='username'
                        touched={formik.touched.username}
                        error={formik.errors.username}
                        {...formik.getFieldProps('username')}
                    />
                    <CustomInputField
                        placeholder='password'
                        type='password'
                        touched={formik.touched.password}
                        error={formik.errors.password}
                        {...formik.getFieldProps('password')}
                    />
                </div>
                <button type="submit" disabled={isSubmitButtonDisabled}>SIGN IN</button>
                <p className={s.navLinkText}><Link to='/sign-up'>Sign up</Link> if you don't have an account yet.
                </p>
            </form>
        </div>
    );
};