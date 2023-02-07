import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const userContext = createContext();

let initialValue;

if (localStorage.getItem('userState') === null) {

  initialValue = {
    intro: {
      greeting: 'Hi, my name is',
      name: 'John Doe',
      header: 'I am a Designer',
      specialty: `I am specializing in UX Design`,
      current: `Currently, i am searching for new challenges`,
    },
  };
} else {

  initialValue = {
    intro: JSON.parse(localStorage.getItem('userState')),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'INTRO':
      return {
        ...state,
        intro: { ...state.intro, ...action.payload },
      };
    default:
      return state;
  }
}

function UserContext({ children }) {
  const [userState, dispatchUserState] = useReducer(reducer, initialValue);

  // useEffect(() => {
  //   if (localStorage.getItem('user_id') !== null) {
  //     const user_id = localStorage.getItem('user_id');
  //     axios
  //       .post('http://localhost:8080/users/getUserData', { user_id })
  //       .then((userData) => {
  //         dispatchUserState({
  //           type: 'INTRO',
  //           payload: userData.data.userDataFromDb,
  //         });
  //         localStorage.setItem(
  //           'userState',
  //           JSON.stringify(userData.data.userDataFromDb)
  //         );
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

  return (
    <userContext.Provider value={{ userState, dispatchUserState }}>
      {children}
    </userContext.Provider>
  );
}

export default UserContext;
