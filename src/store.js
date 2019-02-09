import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import github from './redux/github';

const rootReducer = combineReducers({
  github,
});

export default function configureStore(preloadedState) {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
}
