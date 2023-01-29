import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { setLocalStorage } from '../util/setLocalStorage';
import { logout } from '../util/logout';
const AuthContext = createContext(null);

const initialValue = {
  isAuth: false,
  msg: '',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialValue);

  const login = (user) => {
    axios
      .post('http://localhost:8080/users/login', {
        email: user.email,
        password: user.password,
      })
      .then((user) => {
        setLocalStorage(user);
        setUser({
          isAuth: true,
          msg: '',
        });
      })
      .catch((error) => {
        console.log(error, 'error w login');
        setUser({
          isAuth: false,
          msg: error.response.data.msg,
        });
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');

    axios
      .get('http://localhost:8080/users/logout')
      .then((res) => {
        console.log(res.msg);
      })
      .catch((err) => {
        throw new Error('Log out was not successfully.');
      });

    setUser({
      isAuth: false,
      msg: '',
    });
  };

  // memoize the full context value
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={{ contextValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('AuthContext was used outside of its Provider');
  }
  return context;
};
