import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory({ basename: "/" });
ReactDOM.render(
  // <React.StrictMode>
  <Router history={history}>
    <App />
  </Router>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

reportWebVitals();
