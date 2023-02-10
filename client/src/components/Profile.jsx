import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import axios from 'axios';
import Line from './Line';
import { useContext } from 'react';
import { userSocialContext } from '../context/userSocialContext';
import UploadFile from './Website/Profile/UploadFile';
import DownloadFile from './Website/Profile/DownloadFile';
function Profile() {
  const { userSocialState, dispatchUserSocialState } =
    useContext(userSocialContext);

  const [user, setUser] = useState({
    newPassword: '',
    confirmPassword: '',
    github: '',
    linkedIn: '',
  });

  const location = useLocation();
  const [passwordMessage, setPasswordMessage] = useState('');
  const [socialMessage, setSocialMessage] = useState('');
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValue) => ({ ...prevValue, [name]: value }));
  }

  async function handleSubmitChangePassword(event) {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    axios
      // This address will change depends on PORT
      // you are using or after uploading
      .patch('http://localhost:8080/users/changePassword', {
        newPassword: user.newPassword,
        confirmPassword: user.confirmPassword,
        userId,
      })
      .then((user) => {
        console.log(user, 'profile');
        setPasswordMessage(user.data.msg);
        setUser({
          newPassword: '',
          confirmPassword: '',
          github: '',
          linkedIn: '',
        });
      })
      .catch((error) => {
        setPasswordMessage(user.data.msg);
      });
  }

  async function handleSubmitChangeLinks(event) {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    axios
      // This address will change depends on PORT
      // you are using or after uploading
      .patch('http://localhost:8080/users/updateUser', {
        linkedIn: user.linkedIn,
        github: user.github,
        userId,
      })
      .then((user) => {
        setSocialMessage(user.data.msg);
        setUser({
          newPassword: '',
          confirmPassword: '',
          github: '',
          linkedIn: '',
        });
        dispatchUserSocialState({ type: 'UPDATE', payload: user.data.social });
      })
      .catch((error) => {
        setSocialMessage(user.data.msg);
      });
  }

  return (
    <div className='login-form'>
      <h3>Here you can change your data:</h3>
      <form onSubmit={handleSubmitChangeLinks} className='login-form'>
        <h4>Set your social media links:</h4>
        {socialMessage && <div className='error'>{socialMessage}</div>}
        <label className='login-label' htmlFor='github'>
          GitHub
        </label>
        <input
          className='login-input'
          type='text'
          placeholder='Your github account'
          name='github'
          id='github'
          value={user.github}
          onChange={handleChange}
        />
        <label className='login-label' htmlFor='linkedIn'>
          LinkedIn
        </label>
        <input
          className='login-input'
          type='text'
          placeholder='Your LinkedIn account'
          name='linkedIn'
          id='linkedIn'
          value={user.linkedIn}
          onChange={handleChange}
        />
        <button type='submit' className='login-button'>
          Update
        </button>
      </form>
      <Line />
      <form className='login-form'>
        <h4>Upload your Resume:</h4>
        {passwordMessage && <div className='error'>{passwordMessage}</div>}
        <UploadFile />
      </form>
      <Line />
      <form onSubmit={handleSubmitChangePassword} className='login-form'>
        <h4>Change Password:</h4>
        {passwordMessage && <div className='error'>{passwordMessage}</div>}
        <label className='login-label' htmlFor='newPassword'>
          New Password
        </label>
        <input
          className='login-input'
          type='password'
          placeholder='New Password'
          name='newPassword'
          id='newPassword'
          value={user.newPassword}
          onChange={handleChange}
        />
        <label className='login-label' htmlFor='confirmPassword'>
          Confirm Password
        </label>
        <input
          className='login-input'
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          id='confirmPassword'
          value={user.confirmPassword}
          onChange={handleChange}
        />
        <button type='submit' className='login-button'>
          Change
        </button>
      </form>
    </div>
  );
}

export default Profile;
