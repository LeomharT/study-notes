import '@blueprintjs/core/lib/css/blueprint.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLDivElement);


root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
