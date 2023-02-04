import React, { useState, useContext } from 'react';
import { useRef } from 'react';
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
    dispatchUserState({ type: 'INTRO', payload: note });
  }

  return (
    <div className='create-area'>
      {props.isClicked ? null : (
        <form className='edit-form'>
          <textarea
            name='greeting'
            onChange={handleChange}
            value={note.greeting}
            placeholder={userState.intro.greeting}
            rows='1'
          />
          <textarea
            name='name'
            onChange={handleChange}
            value={note.name}
            placeholder={userState.intro.name}
            rows='1'
          />
          <textarea
            name='header'
            onChange={handleChange}
            value={note.header}
            placeholder={userState.intro.header}
            rows='1'
          />
          <textarea
            name='specialty'
            onChange={handleChange}
            value={note.specialty}
            placeholder={userState.intro.specialty}
            rows='1'
          />
          <textarea
            name='current'
            onChange={handleChange}
            value={note.current}
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
