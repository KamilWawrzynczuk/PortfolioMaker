import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const userProjectsContext = createContext();

let initialValue;

if (localStorage.getItem('userProjectsState') === null) {
  initialValue = [
    {
      _id: '',
      subtitle: 'Latest Project',
      title: 'Wall of wonder',
      description:
        'Description of the project. This should be fairly concise while also describing the key components that you developed or worked on. It can be as long as you need it to be but should at least be a few sentences long. Be sure to include specific links anywhere in the description.',
      secondSubtitle: 'Technologies used include:',
      list: 'HTML | CSS | JAVASCRIPT',
      image: 'https://assets.codepen.io/296057/fem-gettingstartedcss-ch5-1.png',
    },
  ];
} else {
  initialValue = JSON.parse(localStorage.getItem('userProjectsState'));
}

function reducer(state, action) {
  switch (action.type) {
    case 'PROJECTS':
      return [...action.payload];
    default:
      return state;
  }
}

function UserProjectsContext({ children }) {
  const [userState, dispatchUserState] = useReducer(reducer, initialValue);

  // useEffect(() => {
  //   if (localStorage.getItem('user_id') !== null) {
  //     const user_id = localStorage.getItem('user_id');
  //     axios
  //       .post('http://localhost:8080/users/getUserProjects', { user_id })
  //       .then((userData) => {
  //         console.log(userData.data.projects, ' w project context use effect before dispatch')
  //         dispatchUserState({
  //           type: 'PROJECTS',
  //           payload: userData.data.projects,
  //         });

  //         localStorage.setItem(
  //           'userProjectsState',
  //           JSON.stringify(userData.data.projects)
  //         );
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

  return (
    <userProjectsContext.Provider value={{ userState, dispatchUserState }}>
      {children}
    </userProjectsContext.Provider>
  );
}

export default UserProjectsContext;
