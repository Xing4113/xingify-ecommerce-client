import "../styles/pages/auth.scss";
import { ReactComponent as LogoIcon } from "../assets/icons/logo-rm.svg";
import { ReactComponent as GoogleIcon } from "../assets/icons/google-icon.svg";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebook-icon.svg";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return (
    <div className="auth-container login-container">
      <div className="auth-card login-card">
        <h1>
          <Link to="/">
            <LogoIcon className="logo-img" />
          </Link>
        </h1>

        <div className="auth-intro">
          <h2>Log in</h2>
          <p>Choose one to continue</p>
        </div>

        <div className="social-login">
          <a
            className="social-btn google-btn"
            href={`${API_BASE_URL}auth/google`}
          >
            <GoogleIcon className="social-icon" />
            Continue with Google
          </a>
          <a
            className="social-btn facebook-btn"
            href={`${API_BASE_URL}auth/facebook`}
          >
            <FacebookIcon className="social-icon" />
            Continue with Facebook
          </a>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
