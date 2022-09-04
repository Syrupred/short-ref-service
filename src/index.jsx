import React from 'react';
import '../assets/application.scss';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

const mountNode = document.getElementById('app');
const root = ReactDOM.createRoot(mountNode);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
