import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { userProjectsContext } from '../context/UserProjectsContext';
import SingleProject from './Website/ProjectsComponents/SingleProject';

function Projects() {
  const { userState, dispatchUserState } = useContext(userProjectsContext);
  function handleAddProject() {
    const userId = localStorage.getItem('user_id');
    axios
      .put('http://localhost:8080/users/addProjectData', {
        userId,
      })
      .then((newProject) => {
        console.log(newProject, ' w add new project ');
        dispatchUserState({
          type: 'ADD',
          payload: [
            {
              projectId: newProject.data.userData.projectId,
              subtitle: newProject.data.userData.subtitle,
              title: newProject.data.userData.title,
              description: newProject.data.userData.description,
              secondSubtitle: newProject.data.userData.secondSubtitle,
              list: newProject.data.userData.list,
              image: newProject.data.userData.image,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='section-blue'>
      <section id='projects'>
        <h2>Projects I'm proud of</h2>
        {userState.map((project, index) => (
          <SingleProject
            key={uuidv4()}
            direction={index % 2 === 0 ? 'reverse' : ''}
            projectId={project.projectId}
            subtitle={project.subtitle}
            title={project.title}
            description={project.description}
            secondSubtitle={project.secondSubtitle}
            list={project.list}
            image={project.image}
          />
        ))}

        <div className='edit-button-div'>
          <button
            onClick={handleAddProject}
            type='button'
            aria-label='Click here to delete project'
            className='edit-button edit-button-add'
          >
            Add project
          </button>
        </div>
      </section>
    </div>
  );
}

export default Projects;
