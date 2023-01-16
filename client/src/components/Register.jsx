import React from 'react';
import Line from './Line';

function Register() {
  return (
    <>
      <div className="">
        <form className="login-form">
          <h3>Please Register</h3>
          <label className="login-label" for="fName">
            First Name
          </label>
          <input
            className="login-input"
            type="text"
            placeholder="Firs Name"
            name="fName"
            id="fName"
          />
          <label className="login-label" for="lName">
            Last Name
          </label>
          <input
            className="login-input"
            type="text"
            placeholder="Name"
            name="lName"
            id="lName"
          />
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
          <label className="login-label" for="confirmPassword">
            Confirm Password
          </label>
          <input
            className="login-input"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
          />
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
