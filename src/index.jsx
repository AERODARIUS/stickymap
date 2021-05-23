import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'antd/dist/antd.css';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
serviceWorker.unregister();
