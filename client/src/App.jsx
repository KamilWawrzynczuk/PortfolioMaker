import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User';
import Register from './components/Register';
import Profile from './components/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import PasswordResetLandingPage from './components/PasswordResetLandingPage';
import Projects from './components/Projects';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/register' exact element={<Register />}></Route>
        <Route
          path='/users/forgot-password'
          element={<ForgotPasswordPage />}
        ></Route>
        <Route
          path='/users/reset-password/:passwordResetCode'
          element={<PasswordResetLandingPage />}
        ></Route>

        <Route path='/users' element={<RequireAuth />}>
          <Route path='/users' element={<User />}></Route>
          <Route path='/users/profile' element={<Profile />}></Route>
          <Route path='/users/projects' element={<Projects />}></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
