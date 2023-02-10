import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { userProjectsContext } from '../../../context/UserProjectsContext';
import FileDownload from 'js-file-download';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userState, dispatchUserState } = useContext(userProjectsContext);
  const [message, setMessage] = useState('');

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    setFile((prev) => file);
  };

  function handleUpload(e) {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem('user_id');
    const data = new FormData();
    data.append('file', file);
    axios
      .post(`http://localhost:8080/files/upload/${userId}`, data)
      .then((response) => {
        setLoading(false);
        setMessage(response.data.msg);
      })
      .catch((error) => {
        setMessage(response.data.msg);
      });
  }

  return (
    <>
      {' '}
      {message && (
        <>
          <div className='error'>{message}</div>
          <br />
        </>
      )}
      <label htmlFor='file' className='edit-label'>
        Choose file:
      </label>
      <input
        id='file'
        type='file'
        onChange={handleSelectFile}
        multiple={false}
        name='file'
        className='edit-input'
      />
      {file && <span className='edit-span'> {file.name} </span>}
      {file && (
        <>
          <button
            type='submit'
            onClick={handleUpload}
            className='edit-button button-upload'
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </>
      )}
    </>
  );
}

export default UploadFile;
