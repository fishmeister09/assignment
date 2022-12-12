import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './Assets/ArticulatCF-Bold.ttf';
import './Assets/ArticulatCF-DemiBold.ttf';
import './Assets/ArticulatCF-ExtraBold.ttf';
import './Assets/ArticulatCF-Heavy.ttf';
import './Assets/ArticulatCF-Medium.ttf';
import './Assets/ArticulatCF-Normal.ttf';
import './Assets/ArticulatCF-Thin.ttf';
import './Assets/ArticulatCF-Light.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
