import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import { AuthProvider } from './auth/auth';
import UserContext from './context/UserIntroContext';
import UserProjectsContext from './context/UserProjectsContext';
import './css/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary>
      <AuthProvider>
        <UserContext>
          <UserProjectsContext>
            <App />
          </UserProjectsContext>
        </UserContext>
      </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
