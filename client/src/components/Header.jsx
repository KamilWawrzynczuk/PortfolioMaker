import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/auth';

function Header() {

  const auth = useAuth();
  const isAuth = JSON.parse(window.localStorage.getItem('isAuth'));
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <h1>
                <span
                  className='fa-solid fa-laptop-code'
                  aria-hidden='true'
                ></span>
                <Link to='/'>
                  <span>Portfolio Creator</span>
                </Link>
              </h1>
            </li>
            {isAuth !== false ? (
              <>
                <li>
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        color: isActive ? 'red' : '',
                      };
                    }}
                    to='/'
                  >
                    Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={({ isActive }) => {
                      return {
                        color: isActive ? 'pink' : '',
                      };
                    }}
                    to='/'
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <Link to='/'>Contact Me</Link>
                </li>
                <li>
                  <Link to='/users/profile'>Profile</Link>
                </li>
                <li>
                  <Link to='/' onClick={auth.contextValue.logout}>
                    Log out
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <span
                      className='fa-brands fa-linkedin'
                      aria-hidden='true'
                    ></span>
                    <span className='sr-only'>LinkedIn</span>
                  </Link>
                </li>
                <li>
                  <Link to='/'>
                    <i className='fa-brands fa-github' aria-hidden='true'></i>
                    <span className='sr-only'>Github</span>
                  </Link>
                </li>
                <li>
                  <Link to='#' className='button'>
                    Resume
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/users/login'>Login</Link>
                </li>
                <li>
                  <Link to='/users/register'>Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
