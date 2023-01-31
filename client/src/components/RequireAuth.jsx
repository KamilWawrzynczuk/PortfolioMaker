import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../util/isLoggedIn';
import moment from 'moment';
function RequireAuth({ children }) {
  const location = useLocation();
  const isAuth = JSON.parse(window.localStorage.getItem('isAuth'));
  
  // useEffect(() => {
  //   (() => {
  //     const token = localStorage.getItem('token') || '';
  //     axios
  //       // This address will change depends on PORT
  //       // you are using or after uploading
  //       .get('http://localhost:8080/protected', {
  //         headers: {
  //           Authorization: token,
  //         },
  //       })
  //       .then((user) => {
  //         console.log(user, 'succes w require')
  //           window.localStorage.setItem('isAuth', 'true')
  //           auth.contextValue.setUser({
  //             isAuth: user.data.success,
  //             msg: '',
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err, ' err w require')
  //           // window.localStorage.setItem('isAuth', 'false')
  //           // auth.contextValue.setUser({
  //           //   isAuth: err.response.data.success,
  //           //   msg: '',
  //           // });
  //       });
  //   })();
  // }, []); // eslint-disable-line

  if (!isAuth) {
    return <Navigate to='/' state={{ path: location.pathname }} />;
  } else {
    return children;
  }
}

export default RequireAuth;
