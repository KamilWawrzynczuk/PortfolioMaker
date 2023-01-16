import React from 'react';
import SingleProject from './SingleProject';

function Projects() {
  return (
    <div className="section-blue">
      <section id="projects">
        <h2>Projects I'm proud of</h2>
        <SingleProject />
        <SingleProject direction="reverse" />
      </section>
    </div>
  );
}

export default Projects;
