import { useEffect } from 'react';
import { Navigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/auth';

const Logout = ({children}) => {
  const auth = useAuth();

  useEffect(() => {
    (() => {
      axios.get('http://localhost:8080/users/logout')
        .then(res => auth.contextValue.logout())
        .catch(err => {
          throw new Error('Log out was not successfully.');
      })
    })()
  }, []);

  if (!auth.contextValue.user.isAuth) {
    return <Navigate to='/' state={{ path: location.pathname }} />;
  }
  return children;
};

export default Logout;
