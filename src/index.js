import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/css/main.css";
import { unregisterAllServiceWorkers } from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

unregisterAllServiceWorkers();