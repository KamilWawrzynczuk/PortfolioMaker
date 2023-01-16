import React from 'react'

function Footer() {
  return (
    <footer>
      <h2>Kamil Wawrzyńczuk &middot; Web Developer</h2>
      <ul>
        <li>
          <a href="#">
            <span className="fa-brands fa-linkedin" aria-hidden="true"></span>
            <span className="sr-only">LinkedIn</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="fa-brands fa-github" aria-hidden="true"></span>
            <span className="sr-only">Github</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="fa-solid fa-envelope" aria-hidden="true"></span>
            <span className="sr-only">Email</span>
          </a>
        </li>
      </ul>

      <p><small>&copy; 2022 Kamil Wawrzyńczuk. All rights reserved.</small></p>
    </footer>
  )
}

export default Footer