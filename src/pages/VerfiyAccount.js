import "../styles/pages/auth.scss";
import { ReactComponent as LogoIcon } from "../assets/icons/logo-rm.svg";
import PasswordLoginForm from "../components/PasswordLoginForm";
import OtpLoginForm from "../components/OtpLoginForm";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function VerifyAccount() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("password");

  const [otpTimer, setOtpTimer] = useState(0);
  const hasSentOtpRef = useRef(false);

  // Redirect back to login if no email was passed
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    let countdown;

    // Start countdown if timer > 0
    if (otpTimer > 0) {
      countdown = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [otpTimer]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>
          <Link to="/">
            <LogoIcon className="logo-img" />
          </Link>
        </h1>

        <div className="auth-intro">
          <h2>
            {loginMethod === "password"
              ? "Enter your password"
              : "Enter OTP Code"}
          </h2>

          <div className="confirm-email-container">
            <p>
              {loginMethod === "password" ? "" : "Sent a code to "}

              <span className="show-email">{email}</span>
            </p>
            <Link to="/login" className="edit-email-text">
              Edit
            </Link>
          </div>
        </div>

        {email && loginMethod === "password" && (
          <PasswordLoginForm email={email} onSwitchMethod={setLoginMethod} />
        )}
        {email && loginMethod === "otp" && (
          <OtpLoginForm
            email={email}
            onSwitchMethod={setLoginMethod}
            otpTimer={otpTimer}
            setOtpTimer={setOtpTimer}
            hasSentOtpRef={hasSentOtpRef}
          />
        )}
      </div>
    </div>
  );
}

export default VerifyAccount;
