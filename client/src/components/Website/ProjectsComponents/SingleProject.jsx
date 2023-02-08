import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { userProjectsContext } from '../../../context/UserProjectsContext';
import EditFormForProject from './EditFormForProject';
import UploadImage from './UploadImage';

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

  const userId = localStorage.getItem('user_id');

  function handleClick() {
    setIsClicked(!isClicked);
  }

  function handleDelete() {
    axios
      .delete(`http://localhost:8080/users/deleteOneProject/${projectId}`)
      .then((res) => {
        dispatchUserState({ type: 'DELETE', payload: projectId });
      })
      .catch((err) => console.log(err));
  }

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
            <UploadImage projectId={projectId} userId={userId} />
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
