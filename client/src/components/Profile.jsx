import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.contextValue.logout();
    navigate('/users/login')
  };

  return (
    <>
      <div>Profile Page. Welcome</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Profile;
