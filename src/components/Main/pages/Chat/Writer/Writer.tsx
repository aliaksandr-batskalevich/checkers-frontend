import React, {KeyboardEvent, useRef} from 'react';
import s from './Writer.module.scss';
import {useFormik} from "formik";
import {MuteButton} from "../../../../commons/MuteButton/MuteButton";

type WriterPropType = {
    isSendSounds: boolean
    switchSendSound: (isSounds: boolean) => void
    sendMessage: (message: string) => void
};

type FormikMessageValuesType = {
    message: string
};

export const Writer: React.FC<WriterPropType> = ({isSendSounds, switchSendSound, sendMessage}) => {

    const initialValues: FormikMessageValuesType = {message: ''};
    const validate = (values: FormikMessageValuesType) => {
        const errors = {} as Record<string, string>;
        if (!values.message.trim()) {
            errors.message = `Field is required!`;
        }
        return errors;
    };
    const onSubmit = (values: FormikMessageValuesType) => {
      sendMessage(values.message.trim());
      formik.resetForm();
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,
    });

    // code for submit form onPress ctrl+Enter
    const btnRef = useRef(null);
    const onKeyDownTextareaHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {

            // @ts-ignore
            btnRef.current?.click();
        }
    };

    const isSubmitDisabled = !!Object.keys(validate(formik.values)).length;

    return (
        <div className={s.writerWrapper}>
            <form onSubmit={formik.handleSubmit}>
                <textarea
                    {...formik.getFieldProps('message')}
                    placeholder='Your message...'
                    onKeyDown={onKeyDownTextareaHandler}
                    autoFocus
                />
                <button id='btn' ref={btnRef} type='submit' disabled={isSubmitDisabled}>send</button>
                <MuteButton isSounds={isSendSounds} switchSounds={switchSendSound}/>
            </form>
        </div>
    );
};