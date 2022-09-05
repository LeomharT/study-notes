import { Button, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './src/assets/scss/index.scss';
import Njasdo from './src/components/ok';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
    <React.StrictMode>
        <div>
            <Button text='12World' intent={Intent.DANGER} />
            <Njasdo />
            asoidjiaosjd
        </div>
    </React.StrictMode>
);


reportWebVitals();
