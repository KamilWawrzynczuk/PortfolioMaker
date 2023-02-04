import React, { useRef, useContext } from 'react';
import CreateArea from '../../CreateArea';
import { userContext } from '../../../context/UserContext';
import { useState } from 'react';

function IntroHeader() {
  const { userState, dispatchUserState } = useContext(userContext);

  const [isClicked, setIsClicked] = useState(true);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  return (
    <>
      <div className='edit-area'>
        <h2 onClick={handleClick} className='click-area'>
          {userState.intro.header}
        </h2>

        <button
          onClick={handleClick}
          type='button'
          aria-label='Click here to edit paragraph'
          className='edit-button'
        >
          Edit
        </button>
      </div>

      <CreateArea
        setIsClicked={setIsClicked}
        isClicked={isClicked}
        dispatch={'INTRO_HEADER'}
      />
    </>
  );
}

export default IntroHeader;
