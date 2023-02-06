import React, { useState, useContext } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { userContext } from '../context/UserContext';
function CreateArea(props) {
  const { userState, dispatchUserState } = useContext(userContext);

  const [note, setNote] = useState({
    intro: {
      greeting: userState.intro.greeting,
      name: userState.intro.name,
      header: userState.intro.header,
      specialty: userState.intro.specialty,
      current: userState.intro.current,
    },
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        intro: { ...prevNote.intro,  [name]: value },
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.setIsClicked(!props.isClicked);

    const userId = localStorage.getItem('user_id');
    axios
      .patch('http://localhost:8080/users/addIntroData', {
        data: note,
        userId,
      })
      .then((respond) => {
        dispatchUserState({
          type: 'INTRO',
          payload: {
            greeting:
              note.intro.greeting.length > 0
                ? note.intro.greeting
                : userState.intro.greeting,
            name:
              note.intro.name.length > 0
                ? note.intro.name
                : userState.intro.name,
            header:
              note.intro.header.length > 0
                ? note.intro.header
                : userState.intro.header,
            specialty:
              note.intro.specialty.length > 0
                ? note.intro.specialty
                : userState.intro.specialty,
            current:
              note.intro.current.length > 0
                ? note.intro.current
                : userState.intro.current,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      const user_id = localStorage.getItem('user_id');
      axios
        .post('http://localhost:8080/users/getUserData', { user_id })
        .then((userData) => {
          console.log(userData.data.userDataFromDb, ' w create area');
          dispatchUserState({
            type: 'INTRO',
            payload: userData.data.userDataFromDb,
          });
          console.log(userData, ' w create area use effect')
          localStorage.setItem(
            'userState',
            JSON.stringify(userData.data.userDataFromDb)
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
    <div className='create-area'>
      {props.isClicked ? null : (
        <form className='edit-form'>
          <textarea
            name='greeting'
            onChange={handleChange}
            placeholder={userState.intro.greeting}
            rows='1'
          />
          <textarea
            name='name'
            onChange={handleChange}
            placeholder={userState.intro.name}
            rows='1'
          />
          <textarea
            name='header'
            onChange={handleChange}
            placeholder={userState.intro.header}
            rows='1'
          />
          <textarea
            name='specialty'
            onChange={handleChange}
            placeholder={userState.intro.specialty}
            rows='1'
          />
          <textarea
            name='current'
            onChange={handleChange}
            placeholder={userState.intro.current}
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

export default CreateArea;
