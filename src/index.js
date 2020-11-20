import { configure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

configure({ enforceActions: 'never' });

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
