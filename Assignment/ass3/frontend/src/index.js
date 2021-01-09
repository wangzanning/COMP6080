import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import data from './screens/components/data';
import {createStore} from "redux";
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';

//must create store before send to Provider in the index.
//add Chrome plugin called "redux-dev-tools".
const myReducer = persistReducer({ key: 'root', storage }, data)
const store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistData = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistData}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </PersistGate>
    </Provider>,
  document.getElementById('root'),
);
