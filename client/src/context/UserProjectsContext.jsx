import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const userProjectsContext = createContext();

// let isDatabaseEmpty;

// console.log(isDatabaseEmpty, ' is empty databse?');

// const isProjectsDbEmpty = axios
//   .post('http://localhost:8080/users/getUserProjects', { isNotEmpty: true })
//   .then((res) => {
//     console.log(res)
//     return res.data.success;
//   })
//   .catch((err) => console.log(err));

// console.log(isProjectsDbEmpty, 'is empty');

let initialValue = [];

// if (localStorage.getItem('userProjectsState') === null) {
//   initialValue = [
//     {
//       _id: '',
//       subtitle: 'Latest Project',
//       title: 'Wall of wonder',
//       description:
//         'Description of the project. This should be fairly concise while also describing the key components that you developed or worked on. It can be as long as you need it to be but should at least be a few sentences long. Be sure to include specific links anywhere in the description.',
//       secondSubtitle: 'Technologies used include:',
//       list: 'HTML | CSS | JAVASCRIPT',
//       image: 'https://assets.codepen.io/296057/fem-gettingstartedcss-ch5-1.png',
//     },
//   ];
// } else {
//   initialValue = JSON.parse(localStorage.getItem('userProjectsState'));
// }

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      console.log(action.payload, 'fire w UPDATE');
      return [...action.payload];
    case 'EDIT':
      console.log(action.payload, 'fire W EDIT');
      return state.map((ele, index) => {
        if (ele.projectId === action.payload[0].projectId) {
          return action.payload[0];
        } else {
          return ele;
        }
      });
    case 'DELETE':
      console.log(action.payload, ' fire DELETE');
      return state.filter((project) => project.projectId !== action.payload);
    case 'ADD':
      console.log(action.payload, 'fire w ADD');
      return [...state, ...action.payload];
    default:
      return state;
  }
}

function UserProjectsContext({ children }) {
  const [userState, dispatchUserState] = useReducer(reducer, initialValue);

  return (
    <userProjectsContext.Provider value={{ userState, dispatchUserState }}>
      {children}
    </userProjectsContext.Provider>
  );
}

export default UserProjectsContext;
