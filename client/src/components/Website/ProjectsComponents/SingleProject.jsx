import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { userProjectsContext } from '../../../context/UserProjectsContext';
import EditFormForProject from './EditFormForProject';

function SingleProject(props) {
  const { userState, dispatchUserState } = useContext(userProjectsContext);

  const {
    direction,
    subtitle,
    title,
    description,
    secondSubtitle,
    list,
    projectId,
    image,
  } = props;
  const [isClicked, setIsClicked] = useState(true);

  function handleClick() {
    setIsClicked(!isClicked);
  }

  function handleDelete() {
    console.log([projectId, ' przed axios w single ']);

    axios
      .delete(`http://localhost:8080/users/deleteOneProject/${projectId}`)
      .then((res) => {
        dispatchUserState({type: "DELETE", payload: projectId})
      })
      .catch((err) => console.log(err));
  }

  // useEffect(() => {
  //   if (localStorage.getItem('user_id') !== null) {
  //     const user_id = localStorage.getItem('user_id');
  //     axios
  //       .post('http://localhost:8080/users/getUserProjects', { user_id })
  //       .then((userData) => {
  //         console.log(
  //           userData.data.projects,
  //           ' w project context use effect before dispatch'
  //         );
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
    <>
      <article className={direction}>
        <div className='text'>
          <h4>{subtitle}</h4>
          <h3>{title}</h3>
          <p className='blackbox'>{description}</p>
          <h4>{secondSubtitle}</h4>
          <p className='list'>{list}</p>

          <div className='project-edit-form'>
            <button
              onClick={handleClick}
              type='button'
              aria-label='Click here to edit paragraph'
              className='edit-button'
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              type='button'
              aria-label='Click here to delete project'
              className='edit-button edit-button-delete'
            >
              Delete
            </button>
            <EditFormForProject
              projectId={projectId}
              setIsClicked={setIsClicked}
              isClicked={isClicked}
            />
          </div>
        </div>

        <img src={image} alt='Screenshot of the Wall of Wonder.' />
      </article>
    </>
  );
}

export default SingleProject;
