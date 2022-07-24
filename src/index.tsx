import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { App } from './n1-main/m0-App/App';
import { store } from './n5-bll/redux';
import reportWebVitals from './reportWebVitals';

import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  // </React.StrictMode>,
);
reportWebVitals();
