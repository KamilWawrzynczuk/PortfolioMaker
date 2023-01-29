import React from 'react';
import { AuthProvider } from './auth/auth';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User';
import Register from './components/Register';
import Protected from './components/Protected';
import Profile from './components/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';
import Logout from './components/Logout';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/users/login' exact element={<Login />}></Route>
          <Route path='/users/register' exact element={<Register />}></Route>
          <Route
            path='/users'
            element={
              <RequireAuth>
                <User />
              </RequireAuth>
            }
          >
            <Route path='/users/profile' exact element={<Profile />}></Route>
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
