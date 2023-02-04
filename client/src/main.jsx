import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './css/style.css';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { AuthProvider } from './auth/auth';
import UserContext from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary>
      <AuthProvider>
        <UserContext>
          <App />
        </UserContext>
      </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
