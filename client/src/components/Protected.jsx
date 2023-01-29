import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    axios
      .get('http://localhost:8080/protected', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res)
        setErrorMessage(error.res.data.msg);
        navigate('/users/protected');
      })
      .catch((err) => {
        console.log('You are not log in.');
        navigate('/users/login')
      });
  },[]);


  return (
    <div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <h1>Protected</h1>
    </div>
  );
}

export default Protected;
