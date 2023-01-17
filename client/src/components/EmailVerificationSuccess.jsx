import { useNavigate } from 'react-router-dom';

export const EmailVerificationSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="emailVerification">
            <h1>Success!</h1>
            <p>
                Thanks for verifying your email, now you can login.
            </p>
            <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        </div>
    );
}