import React, { createContext, useReducer } from 'react';

export const userContext = createContext();

const initialValue = {
  intro: {
    greeting: 'Hi, my name is',
    name: 'Kamil Wawrzyńczuk',
    header: 'I am a Developer',
    specialty: `I'm a student specializing in HTML, CSS, JavaScript,UX`,
    current: `Currently, I'm at Bootcamp at DCI`,
  },
  cart: [],
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INTRO':
      console.log(action.payload);
      return {
        ...state,
        intro: {...action.payload }
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

  return (
    <userContext.Provider value={{ userState, dispatchUserState }}>
      {children}
    </userContext.Provider>
  );
}

export default UserContext;
