import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './n1-main/m0-App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './n10-bll/redux';
import './style.css';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
reportWebVitals();
