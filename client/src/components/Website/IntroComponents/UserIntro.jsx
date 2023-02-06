import React, { useRef, useContext } from 'react';
import CreateArea from '../../CreateArea';
import { userContext } from '../../../context/UserContext';
import { useState } from 'react';

function UserIntro() {

  const {userState} = useContext(userContext);
  const [isClicked, setIsClicked] = useState(true);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  return (
    <>
      <div onClick={handleClick} className=''>
        <p className='name click-area'>{userState.intro.greeting}</p>
        <span
          type='button'
          aria-label='Click here to header'
          className='name-span click-area'
        >
          {userState.intro.name}
        </span>
        <h2 className='click-area'>{userState.intro.header}</h2>
        <p>{userState.intro.specialty}</p>
        <p>{userState.intro.current}</p>
      </div>
      <button
        onClick={handleClick}
        type='button'
        aria-label='Click here to edit paragraph'
        className='edit-button'
      >
        Edit
      </button>
      <CreateArea
        setIsClicked={setIsClicked}
        isClicked={isClicked}
        dispatch={'INTRO_HEADER'}
      />
    </>
  );
}

export default UserIntro;
