import React from 'react';
import s from './App.module.scss';
import {Main} from "./components/Main/Main";

function App() {
    return (
        <div className={s.appWrapper}>
            <Main/>
        </div>
    );
}

export default App;
