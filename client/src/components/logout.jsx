import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.put('http://localhost:8080/logout');
        setIsSuccess(true);
        setIsLoading(false);
        navigate('/home');
      } catch (err) {
        console.log(err);
        setIsSuccess(false);
        setIsLoading(false);
      }
    };

    loadVerification();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!isSuccess) navigate('/login')
  navigate('/home')
};

export default Logout;
