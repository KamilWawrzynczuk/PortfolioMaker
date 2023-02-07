import React, { useState } from 'react';
import { useContext } from 'react';
import { userProjectsContext } from '../../../context/UserProjectsContext';
import EditFormForProject from './EditFormForProject';

function Single(props) {
  const { userState } = useContext(userProjectsContext);

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
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <div>Hallo</div>
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

export default Single;
