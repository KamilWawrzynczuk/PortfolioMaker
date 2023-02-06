import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const userContext = createContext();

let initialValue;

if (localStorage.getItem('userState') === null) {
  console.log(' w initial value');
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
  console.log('else w inital value');
  initialValue = {
    intro: JSON.parse(localStorage.getItem('userState'))
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'INTRO':
      console.log('w intro');
      return {
        ...state,
        intro: { ...state.intro, ...action.payload },
      };
    case 'INTRO_NAME':
      return {
        ...state,
        intro: { ...state.intro, name: action.payload },
      };
    case 'INTRO_HEADER':
      return {
        ...state,
        intro: { ...state.intro, header: action.payload },
      };
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        users: state.users.map((ele) => {
          if (ele.password === action.payload.oldPassword)
            return {
              ...ele,
              password: action.payload.newPassword,
              passwordTwo: action.payload.newPassword,
            };
          else return ele;
        }),
      };
    default:
      return state;
  }
}

function UserContext({ children }) {
  const [userState, dispatchUserState] = useReducer(reducer, initialValue);

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      const user_id = localStorage.getItem('user_id');
      axios
        .post('http://localhost:8080/users/getUserData', { user_id })
        .then((userData) => {
          dispatchUserState({
            type: 'INTRO',
            payload: userData.data.userDataFromDb,
          });
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

  return (
    <userContext.Provider value={{ userState, dispatchUserState }}>
      {children}
    </userContext.Provider>
  );
}

export default UserContext;
