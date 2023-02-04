import React, { useContext, useState } from 'react';
import { userContext } from '../../../context/UserContext';
import CreateArea from '../../CreateArea';

function SpanName() {
  const { userState, dispatchUserState } = useContext(userContext);

  const [isClicked, setIsClicked] = useState(true);

  function handleClick() {
    setIsClicked(!isClicked);
  }
  return (
    <>
      <div className='edit-area'>
        <span
          type='button'
          aria-label='Click here to header'
          onClick={handleClick}
          className='name-span click-area'
        >
          {userState.intro.name}
        </span>
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
        dispatch={'INTRO_NAME'}
      />
    </>
  );
}

export default SpanName;
