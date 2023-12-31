import React from 'react';
import ReactDOM from 'react-dom/client';
import './theme.less';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {DataProvider} from "./app/state/DataContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <DataProvider>
        <App />
    </DataProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
