import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <h1>
              <span
                className="fa-solid fa-laptop-code"
                aria-hidden="true"
              ></span>
              <Link to="/">
                <span> Your Company Name</span>
              </Link>
            </h1>
          </li>
          {isLogged ? (
            <>
              <li>
                <Link to="/home">Projects</Link>
              </li>
              <li>
                <Link to="/home">About</Link>
              </li>
              <li>
                <Link to="/home">Contact Me</Link>
              </li>
              <li>
                <Link to="/logout">Log out</Link>
              </li>
              <li>
                <Link to="/home">
                  <span
                    className="fa-brands fa-linkedin"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </li>
              <li>
                <Link to="/home">
                  <i className="fa-brands fa-github" aria-hidden="true"></i>
                  <span className="sr-only">Github</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="button">
                  Resume
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
