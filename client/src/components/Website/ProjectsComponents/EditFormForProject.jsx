import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { userProjectsContext } from '../../../context/UserProjectsContext';

function EditFormForProject(props) {
  const { userState, dispatchUserState } = useContext(userProjectsContext);

  const currentProject = userState.filter((project) => {
    if (project.projectId === props.projectId) {
      return {
        subtitle: project.subtitle,
        title: project.title,
        description: project.description,
        secondSubtitle: project.secondSubtitle,
        list: project.list,
        image: project.image,
      };
    }
  });

  const [note, setNote] = useState(...currentProject);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.setIsClicked(!props.isClicked);

    const userId = localStorage.getItem('user_id');
    axios
      .put('http://localhost:8080/users/addProjectData', {
        data: note,
        userId,
        projectId: props.projectId,
      })
      .then((updateProject) => {
        dispatchUserState({
          type: 'EDIT',
          payload: [
            {
              projectId: updateProject.data.userData.projectId,
              subtitle: updateProject.data.userData.subtitle,
              title: updateProject.data.userData.title,
              description: updateProject.data.userData.description,
              secondSubtitle: updateProject.data.userData.secondSubtitle,
              list: updateProject.data.userData.list,
              image: updateProject.data.userData.image,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    localStorage.setItem('userProjectsState', JSON.stringify(userState));
  }, []);

  return (
    <div className='create-area create-area-form'>
      {props.isClicked ? null : (
        <form className='edit-form edit-form-project'>
          <textarea
            name='subtitle'
            onChange={handleChange}
            placeholder={note.subtitle}
            rows='1'
          />
          <textarea
            name='title'
            onChange={handleChange}
            placeholder={note.title}
            rows='1'
          />
          <textarea
            name='description'
            onChange={handleChange}
            placeholder={note.description}
            rows='4'
          />
          <textarea
            name='secondSubtitle'
            onChange={handleChange}
            placeholder={note.secondSubtitle}
            rows='1'
          />
          <textarea
            name='list'
            onChange={handleChange}
            placeholder={note.list}
            rows='1'
          />

          <button className='edit-button' onClick={submitNote}>
            Edit
          </button>
        </form>
      )}
    </div>
  );
}

export default EditFormForProject;
