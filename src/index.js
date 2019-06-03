import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducer from './reducer';

import '@atlaskit/css-reset';
import './fonts/style.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk))
);

const Root = () => (
  <Provider store={store}>
    <UserAgentProvider ua={window.navigator.userAgent}>
      <App />
    </UserAgentProvider>
  </Provider>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
