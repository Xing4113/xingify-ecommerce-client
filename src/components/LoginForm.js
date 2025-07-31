import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput/FormInput";
import { login } from "../api/auth";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // Email validation function
  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email);

      if (res.emailFound) {
        navigate("/verifyAccount", { state: { email } });
      } else {
        navigate("/signup", { state: { email } });
      }
    } catch (err) {
      // console.error("handleLogin: ", err);
      setErrMsg("An error occurred. Please try again.");
    }
  };

  return (
    <form className="auth-form login-form" onSubmit={handleLogin}>
      <label htmlFor="email" className="d-none">
        Email
      </label>
      <FormInput
        label="Email"
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => {
          const emailValue = e.target.value;
          setEmail(emailValue);
          setIsValidEmail(isEmailValid(emailValue)); // Validate on input change
        }}
        aria-invalid={!isValidEmail}
      />
      {errMsg && <div className="auth-error">{errMsg}</div>}{" "}
      {/* Show error only on submit */}
      <button
        type="submit"
        className={`auth-btn ${!isValidEmail ? "auth-btn-disabled" : ""}`}
        disabled={!isValidEmail}
        aria-disabled={!isValidEmail}
      >
        Continue
      </button>
    </form>
  );
};

export default LoginForm;
