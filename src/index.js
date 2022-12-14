import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

export const store = createStore(reducer, middleware);

const root = ReactDOM.createRoot(document.getElementById('root') || document.createElement('div'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
