import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import axios from 'axios';

function RequireAuth({ children }) {
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    (() => {
      const token = localStorage.getItem('token') || '';
      axios
        .get('http://localhost:8080/protected', {
          headers: {
            Authorization: token,
          },
        })
        .then((user) => {
          auth.contextValue.setUser({
            isAuth: user.data.success,
            msg: '',
          });
        })
        .catch((err) => {
          auth.contextValue.setUser({
            isAuth: err.data.success,
          });
        });
    })();
  }, []);

  if (!auth.contextValue.user.isAuth) {
    return <Navigate to='/users/login' state={{ path: location.pathname }} />;
  }
  return children;
}

export default RequireAuth;
