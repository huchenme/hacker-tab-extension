import { createStore, compose, applyMiddleware } from 'redux'; // add applyMiddleware
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  )
);

export default store;
