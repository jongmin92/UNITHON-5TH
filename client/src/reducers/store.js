import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './index';

// Add middleware module
import logger from './middleware/logger';
import thunk from 'redux-thunk';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

export default store;
