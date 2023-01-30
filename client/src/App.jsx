import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User';
import Register from './components/Register';
import Protected from './components/Protected';
import Profile from './components/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/users/login' exact element={<Login />}></Route>
        <Route path='/users/register' exact element={<Register />}></Route>
        <Route path='/users' element={<User />}>
          <Route
            path='/users/profile'
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          ></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
