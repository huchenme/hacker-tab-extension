import loadDevTools from './dev-tools/load';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './fonts';
import './global.css';

const rootElement = document.getElementById('root');
loadDevTools(() => {
  ReactDOM.render(<App />, rootElement);
});
