import React from 'react';
import s from './PageNotFound.module.scss';
import {useQuery} from "../../../../utils/hooks";
import {withAuthRedirect} from "../../../commons/HOCs/withAuthRedirect";


const PageNotFound = () => {

    const query = useQuery();
    const message = query.get('message');

    return (
        <div className={s.pageNotFoundWrapper}>
            <h2>404: PAGE NOT FOUND</h2>
            {message && <p>{message}</p>}
        </div>
    );
};

export default withAuthRedirect(PageNotFound);