import React from 'react';
import s from './InfoPage.module.scss';
import {useQuery} from "../../../../utils/hooks/useQuery";


export const InfoPage = () => {

    const query = useQuery();
    const code = query.get('code');
    const message = query.get('message');

    return (
        <div className={s.pageNotFoundWrapper}>
            {code && <h2>{code}</h2>}
            {message && <p>{message}</p>}
        </div>
    );
};