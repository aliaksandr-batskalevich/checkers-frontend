import React from 'react';
import s from './AuthComponents.module.scss';
import {useFormik} from "formik";
import {SignUpRequestDataType} from "../../../../models/auth.request";
import {useAppDispatch} from "../../../../utils/hooks";
import {signUpTC} from "../../../../bll/auth.reducer";


export const SignUp = () => {

    const dispatch = useAppDispatch();

    const initialSignUpValues: SignUpRequestDataType & {confirmPassword: string} = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const formik = useFormik({
        initialValues: initialSignUpValues,
        onSubmit: values => {
            dispatch(signUpTC(values.username, values.email, values.password))
                .then(() => {
                    formik.resetForm();
                })
                .catch((reason => {
                    // dispatch(setSnackBarErrorMessage(errorMessage));
                }));
        },
    });

    const inputs = Object.keys(initialSignUpValues);
    const inputsForRender = inputs.map((key, index) => <div key={index} className={s.field}>
        <input
            id={key}
            type={key === 'password' ? 'password' : 'text'}
            placeholder={key}
            {...formik.getFieldProps(key)}
        />
    </div>);

    return (
        <div className={s.loginWrapper}>
            <h2>SIGN UP</h2>
            <form className={s.formWrapper} onSubmit={formik.handleSubmit}>
                {inputsForRender}
                <button type="submit">SIGN UP</button>
                <p className={s.navLinkText}><a href="/signin">Sign in</a> if you already have an account.</p>
            </form>
        </div>
    );
};