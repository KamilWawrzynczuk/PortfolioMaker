import React from 'react';

function Footer() {
  return (
    <footer>
      <h2>Portfolio Creator</h2>
      <ul>
        <li>
          <a
            href='https://www.linkedin.com/in/kamil-wawrzynczuk/'
            target='_blank'
          >
            <span className='fa-brands fa-linkedin' aria-hidden='true'></span>
            <span className='sr-only'>LinkedIn</span>
          </a>
        </li>
        <li>
          <a href='https://github.com/KamilWawrzynczuk' target='_blank'>
            <span className='fa-brands fa-github' aria-hidden='true'></span>
            <span className='sr-only'>Github</span>
          </a>
        </li>
        <li>
          <a href='mailto:kamil.wawrzynczuk@gmail.com' target='_blank'>
            <span className='fa-solid fa-envelope' aria-hidden='true'></span>
            <span className='sr-only'>Email</span>
          </a>
        </li>
      </ul>

      <p>
        <small>&copy; 2023 Kamil Wawrzyńczuk. All rights reserved.</small>
      </p>
    </footer>
  );
}

export default Footer;
