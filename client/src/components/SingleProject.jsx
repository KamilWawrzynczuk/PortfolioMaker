import React from 'react';

function SingleProject({ direction }) {
  return (
    <article className={direction}>
      <div className="text">
        <h4>Latest Project</h4>
        <h3>Wall of Wonder</h3>
        <p className="blackbox">
          Description of the project. This should be fairly concise while also
          describing the key components that you developed or worked on. It can
          be as long as you need it to be but should at least be a few sentences
          long. Be sure to include specific links anywhere in the description. A
          link looks like
          <a href="https://frontendmasters.github.io/grid-flexbox-v2/">this</a>,
          and multiple links look <a href="#">like this</a> and
          <a href="#">like this</a>.
        </p>
        <h4>Technologies used include:</h4>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>SVG</li>
        </ul>
      </div>
      <img
        src="https://assets.codepen.io/296057/fem-gettingstartedcss-ch5-1.png"
        alt="Screenshot of the Wall of Wonder."
      />
    </article>
  );
}

export default SingleProject;
