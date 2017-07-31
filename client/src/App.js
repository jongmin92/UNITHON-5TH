import React from 'react';
import log from 'loglevel';
import { Provider } from 'react-redux';
import store from './reducers/store';
import Router from './Router';

if (process.env.NODE_ENV === 'development') {
  log.setLevel('trace', true);
} else {
  log.setLevel('error', true);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  );
};

export default App;
