import React from 'react';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <h1>
              <a href="#">
                <span
                  className="fa-solid fa-laptop-code"
                  aria-hidden="true"
                ></span>
                <span> Company Name</span>
              </a>
            </h1>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
          <li>
            <a href="#contact">Contact Me</a>
          </li>
          <li>
            <a href="#">
              <span className="fa-brands fa-linkedin" aria-hidden="true"></span>
              <span className="sr-only">LinkedIn</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-github" aria-hidden="true"></i>
              <span className="sr-only">Github</span>
            </a>
          </li>
          <li>
            <a href="#" className="button">
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
