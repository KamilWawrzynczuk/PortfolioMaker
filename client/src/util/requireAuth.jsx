import { Navigate, useLocation } from 'react-router-dom';
import AuthConsumer from '../hooks/auth';

export function RequireAuth({ children }) {
  const [authed] = AuthConsumer();
  const location = useLocation();
  return authed.auth === true ? (
    children
  ) : (
    <Navigate
      to={'/login'}
      replace
      state={{ path: location.pathname }}
    ></Navigate>
  );
}
