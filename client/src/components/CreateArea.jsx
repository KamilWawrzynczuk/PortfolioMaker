import React, { useState, useContext } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { userContext } from '../context/UserContext';
function CreateArea(props) {
  const { userState, dispatchUserState } = useContext(userContext);

  const [note, setNote] = useState({
    greeting: '',
    name: '',
    header: '',
    specialty: '',
    current: '',
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
    dispatchUserState({
      type: 'INTRO',
      payload: {
        greeting:
          note.greeting.length > 0 ? note.greeting : userState.intro.greeting,
        name: note.name.length > 0 ? note.name : userState.intro.name,
        header: note.header.length > 0 ? note.header : userState.intro.header,
        specialty:
          note.specialty.length > 0
            ? note.specialty
            : userState.intro.specialty,
        current:
          note.current.length > 0 ? note.current : userState.intro.current,
      },
    });

    const userId = localStorage.getItem('user_id')
    axios
      .patch('http://localhost:8080/users/addIntroData', { data: userState.intro, userId})
      .then((respond) => {
        console.log(respond.data.msg);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(userState));
  }, [userState]);

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
