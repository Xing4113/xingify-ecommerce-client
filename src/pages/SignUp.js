import "../styles/pages/auth.scss";
import SignUpForm from "../components/SignUpForm";
import { ReactComponent as LogoIcon } from "../assets/icons/logo-rm.svg";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function SignUp() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  // Redirect back to login if no email was passed
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  return (
    <div className="auth-container register-container">
      <div className="auth-card register-card">
        <h1>
          <Link to="/">
            <LogoIcon className="logo-img" />
          </Link>
        </h1>

        <div className="auth-intro">
          <h2>Sign Up</h2>
          <p>Let's get start to shop in Xingify!</p>
          <div className="confirm-email-container">
            <p className="show-email">{email}</p>
            <Link to="/login" className="edit-email-text">
              Edit
            </Link>
          </div>
        </div>

        <SignUpForm email={email} />
      </div>
    </div>
  );
}

export default SignUp;
