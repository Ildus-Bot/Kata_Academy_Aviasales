import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './reducer';
import App from './components/App';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
