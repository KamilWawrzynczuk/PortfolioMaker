import { useNavigate } from 'react-router-dom';

export const EmailVerificationFail = () => {
  const navigate = useNavigate();

  return (
    <div className="emailVerification">
      <h1>Uh oh...</h1>
      <p>
        Something went wrong while trying to verify your email. Please try to
        register again.
      </p>
      <button className="login-button" onClick={() => navigate('/register')}>
        Register
      </button>
    </div>
  );
};
