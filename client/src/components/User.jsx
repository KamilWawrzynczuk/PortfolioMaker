import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../auth/auth';
import { isLogin } from '../util/isLogin';
import UserWebsite from './Website';

function User() {
  const auth = useAuth();
  const [user, setUser] = useState();


  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const user_id = localStorage.getItem('user_id');
    if (isLogin()) {
      axios
        .get(`http://localhost:8080/users/getOne/${user_id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((user) => {
          setUser(user.data.user.fName);
          window.localStorage.setItem('isAuth', 'true');
          auth.contextValue.setUser({
            isAuth: user.data.success,
            msg: '',
          });
        })
        .catch((err) => {
          console.log(err, ' w user err');
          window.localStorage.setItem('isAuth', 'false');
          auth.contextValue.setUser({
            isAuth: err.response.data.success,
            msg: '',
          });
        });
    }
  }, []);

  return (
    <>
      <section id='user-intro'>
        <p className='user-name'>
          Hi, <span>{user}</span>{' '}
        </p>
        <p>
          {' '}
          This is your Portfolio Creator account. <br />
          Click on elements to edit them. To see your website, click here.
        </p>
      </section>
      <UserWebsite />
    </>
  );
}

export default User;
