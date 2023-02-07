import React from 'react';
import { useContext } from 'react';
import { userProjectsContext } from '../context/UserProjectsContext';
import Single from './Website/ProjectsComponents/Single';

function Projects() {
  const { userState } = useContext(userProjectsContext);
  console.log(userState, ' w Projects.jsx');
  return (
    <div className='section-blue'>
      <section id='projects'>
        <h2>Projects I'm proud of</h2>
        {userState.map((project) => (
          <Single
            key={project._id}
            direction={'reverse'}
            projectId={project._id}
            subtitle={project.subtitle}
            title={project.title}
            description={project.description}
            secondSubtitle={project.secondSubtitle}
            list={project.list}
            image={project.image}
          />
        ))}
      </section>
    </div>
  );
}

export default Projects;
