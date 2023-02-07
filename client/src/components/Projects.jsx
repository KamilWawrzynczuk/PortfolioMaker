import React, { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { userProjectsContext } from '../context/UserProjectsContext';
import SingleProject from './Website/ProjectsComponents/SingleProject';

function Projects() {
  const { userState, dispatchUserState } = useContext(userProjectsContext);

  function handleAddProject() {
    const userId = localStorage.getItem('user_id');
    axios
      .patch('http://localhost:8080/users/addProjectData', {
        userId,
      })
      .then((newProject) => {
        console.log(newProject, ' w handleAdd')
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

  // useEffect(() => {
  //   if (localStorage.getItem('user_id') !== null) {
  //     const user_id = localStorage.getItem('user_id');
  //     axios
  //       .post('http://localhost:8080/users/getUserProjects', { user_id })
  //       .then((userData) => {
  //         console.log(userData, ' w edit form use effect');
  //         dispatchUserState({
  //           type: 'PROJECTS',
  //           payload: userData.data.projects,
  //         });

  //         localStorage.setItem(
  //           'userProjectsState',
  //           JSON.stringify(userData.data.projects)
  //         );
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

  return (
    <div className='section-blue'>
      <section id='projects'>
        <h2>Projects I'm proud of</h2>
        {userState.map((project, index) => (
          <SingleProject
            key={project._id}
            direction={index % 2 === 0 ? 'reverse' : ''}
            projectId={project._id}
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
