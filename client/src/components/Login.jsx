import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { setLocalStorage } from '../util/setLocalStorage';
import { useAuth } from '../auth/auth';

function Login() {

  const auth = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const location = useLocation();
  const redirectPath = location.state?.path || '/';

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token') || '';
  //   axios
  //     .get('http://localhost:8080/protected', {
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //     .then((res) => {
  //       navigate('/users/protected');
  //     })
  //     .catch((err) => {
  //       console.log('You are not log in.');
  //       navigate('/users/login')
  //     });
  // },[]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    auth.contextValue.login(user);
    navigate(redirectPath, { replace: true });
  }
  return (
    <div className=''>
      <form onSubmit={handleSubmit} className='login-form'>
        <h3>Please Login</h3>
        {auth.contextValue.user.msg && <div className='error'>{auth.contextValue.user.msg}</div>}
        <label className='login-label' htmlFor='email'>
          Email
        </label>
        <input
          className='login-input'
          type='text'
          placeholder='Email'
          name='email'
          id='email'
          value={user.email}
          onChange={handleChange}
        />
        <label className='login-label' htmlFor='password'>
          Password
        </label>
        <input
          className='login-input'
          type='password'
          placeholder='Password'
          name='password'
          id='password'
          value={user.password}
          onChange={handleChange}
        />
        <button type='submit' className='login-button'>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
