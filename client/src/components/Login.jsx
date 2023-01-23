import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email: credentials.email,
        password: credentials.password,
      });
      navigate('/home');
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.msg);
    }
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="login-form">
        <h3>Please Login</h3>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <label className="login-label" htmlFor="email">
          Email
        </label>
        <input
          className="login-input"
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <label className="login-label" htmlFor="password">
          Password
        </label>
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
