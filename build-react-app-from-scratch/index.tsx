import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLDivElement);


root.render(
    <React.StrictMode>
        <div>
            Hellow World!
        </div>
    </React.StrictMode>
);


reportWebVitals();
