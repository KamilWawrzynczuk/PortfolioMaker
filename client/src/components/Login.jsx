import React from 'react';

function Login() {
  return (
    <div className="">
      <form className="login-form" method="post">
        <h3>Please Login</h3>
        <label className="login-label" for="email">
          Email
        </label>
        <input
          className="login-input"
          type="text"
          placeholder="Email"
          name="email"
          id="email"
        />
        <label className="login-label" for="password">
          Password
        </label>
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
