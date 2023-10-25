import React from 'react';
import s from './NewGameForm.module.scss';
import {useFormik} from "formik";

type NewGameFormPropsType = {
    isNewGameCreating: boolean
    cancel: () => void
    createNewGame: (level: number) => void
};

type formikInitialValuesType = {
    level: string
};

export const NewGameForm: React.FC<NewGameFormPropsType> = ({isNewGameCreating, cancel, createNewGame}) => {

    const initialValues: formikInitialValuesType = {
        level: '1'
    };
    const onSubmit = (values: formikInitialValuesType) => {
        createNewGame(+values.level);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    const startButtonTitle = isNewGameCreating ? 'Creating...' : 'Start';

    return (
        <div className={s.newGameFormWrapper}>
            <h3>Do you want to play?</h3>
            <p className={s.description}>
                Welcome to the game! To start the game, select the difficulty level and click "Start".
            </p>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.formElementsWrapper}>
                    <div className={s.formElement}>
                        <label htmlFor="low">Low</label>
                        <input
                            disabled={isNewGameCreating}
                            type="radio"
                            id='low'
                            name='level'
                            checked={formik.values.level === '1'}
                            value='1'
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={s.formElement}>
                        <label htmlFor="middle">Middle</label>
                        <input
                            disabled={isNewGameCreating}
                            type="radio"
                            id='middle'
                            name='level'
                            checked={formik.values.level === '2'}
                            value='2'
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={s.formElement}>
                        <label htmlFor="high" style={{opacity: '.5', cursor: 'default'}}>High</label>
                        <input
                            style={{cursor: 'default'}}
                            disabled={true || isNewGameCreating}
                            type="radio"
                            id='high'
                            name='level'
                            checked={formik.values.level === '3'}
                            value='3'
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className={s.buttonWrapper}>
                    <button disabled={isNewGameCreating} type='submit'>{startButtonTitle}</button>
                    <button disabled={isNewGameCreating} type='button' onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};