import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { userProjectsContext } from '../../../context/UserProjectsContext';

function EditFormForProject(props) {
  const { userState, dispatchUserState } = useContext(userProjectsContext);
  const [note, setNote] = useState({
    subtitle: userState[0].subtitle,
    title: userState[0].title,
    description: userState[0].description,
    secondSubtitle: userState[0].secondSubtitle,
    list: userState[0].list,
    image: userState[0].image,
  });

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
      .patch('http://localhost:8080/users/addProjectData', {
        data: note,
        userId,
        projectId: props.projectId,
      })
      .then((respond) => {
        console.log(respond, ' w submit note edit form');
        dispatchUserState({
          type: 'PROJECTS',
          payload: {
            projectId: response.data.projectId,
            subtitle:
              note.subtitle.length > 0 ? note.subtitle : userState[0].subtitle,
            title: note.title.length > 0 ? note.title : userState[0].title,
            description:
              note.description.length > 0
                ? note.description
                : userState[0].description,
            secondSubtitle:
              note.secondSubtitle.length > 0
                ? note.secondSubtitle
                : userState[0].secondSubtitle,
            list: note.list.length > 0 ? note.list : userState[0].list,
            image: note.image.length > 0 ? note.image : userState[0].image,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      const user_id = localStorage.getItem('user_id');
      axios
        .post('http://localhost:8080/users/getUserProjects', { user_id })
        .then((userData) => {
          dispatchUserState({
            type: 'PROJECTS',
            payload: userData.data.projects,
          });

          localStorage.setItem(
            'userProjectsState',
            JSON.stringify(userData.data.projects)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('userState', JSON.stringify(userState));
  // }, []);

  return (
    <div className='create-area create-area-form'>
      {props.isClicked ? null : (
        <form className='edit-form edit-form-project'>
          <textarea
            name='subtitle'
            onChange={handleChange}
            placeholder={userState[0].subtitle}
            rows='1'
          />
          <textarea
            name='title'
            onChange={handleChange}
            placeholder={userState[0].title}
            rows='1'
          />
          <textarea
            name='description'
            onChange={handleChange}
            placeholder={userState[0].description}
            rows='4'
          />
          <textarea
            name='secondSubtitle'
            onChange={handleChange}
            placeholder={userState[0].secondSubtitle}
            rows='1'
          />
          <textarea
            name='list'
            onChange={handleChange}
            placeholder={userState[0].list}
            rows='1'
          />
          <button className='edit-button' onClick={submitNote}>
            Add
          </button>
        </form>
      )}
    </div>
  );
}

export default EditFormForProject;
