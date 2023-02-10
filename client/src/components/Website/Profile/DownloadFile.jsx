import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import FileDownload from 'js-file-download';
import { userSocialContext } from '../../../context/userSocialContext';
import { Link } from 'react-router-dom';
function DownloadFile({ isAuth }) {
  const { userSocialState, dispatchUserSocialState } =
    useContext(userSocialContext);
  const [message, setMessage] = useState('');

  function handleDownload(e) {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    axios({
      url: `http://localhost:8080/users/downloadFile/${userId}`,
      method: 'POST',
      responseType: 'blob',
      data: userId,
    })
      .then((res) => {
        FileDownload(
          res.data,
          `${userSocialState.fName}_${userSocialState.lName}_resume.pdf`
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {message && (
        <>
          <div className='error'>{message}</div>
          <br />
        </>
      )}
      {isAuth ? (
        <Link to='#' onClick={handleDownload} className='button'>
          Resume
        </Link>
      ) : (
        <Link to='#' className='button'>
          Resume
        </Link>
      )}
    </>
  );
}

export default DownloadFile;
