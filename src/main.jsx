// src/main.jsx
//
// The entry point for the Creatorverse React application.  This file
// bootstraps the React app by rendering it into the DOM.  We wrap our
// `<App />` component with `<BrowserRouter>` so that React Router can
// manage navigation.  StrictMode is enabled to help surface potential
// issues during development.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);