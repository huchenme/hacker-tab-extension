import React from 'react';
import ReactDOM from 'react-dom';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';

import App from './App';

import '@atlaskit/css-reset';
import './fonts/style.css';

const Root = () => (
  <UserAgentProvider ua={window.navigator.userAgent}>
    <App />
  </UserAgentProvider>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
