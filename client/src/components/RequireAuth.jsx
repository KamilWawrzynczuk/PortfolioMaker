import React, { useEffect } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/auth';

function RequireAuth({ children }) {
  const auth = useAuth();
  const isAuth = JSON.parse(window.localStorage.getItem('isAuth'));

  // const location = useLocation();
  // const navigate = useNavigate();
  // const redirectPath = location.state?.path || '/';

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
  //         window.localStorage.setItem('isAuth', 'true');
  //         auth.contextValue.setUser({
  //           isAuth: user.data.success,
  //           msg: '',
  //         });
  //       })
  //       .catch((err) => {
  //         window.localStorage.setItem('isAuth', 'false');
  //         auth.contextValue.setUser({
  //           isAuth: err.response.data.success,
  //           msg: '',
  //         });
  //       });
  //   })();
  // }, []); // eslint-disable-line

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate(redirectPath, { replace: true });
  //   }, 3000);
  // }, [redirectPath]);

  if (!isAuth)
    return (
      <section id='intro'>
        <div>
          <h2>You are logged out.</h2>
          <p>
            Click <Link to='/'>here</Link> to go to home page.
          </p>
        </div>
      </section>
    );
  if (!isAuth) {
    return <Navigate to='/' state={{ path: location.pathname }} />;
  } else {
    return <Outlet />;
  }
}

export default RequireAuth;
