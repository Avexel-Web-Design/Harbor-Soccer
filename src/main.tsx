import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app/globals.css'; // Ensure globals.css is imported
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);