import React, { useState } from "react";
import FormInput from "./FormInput/FormInput";
import { loginWithPassword } from "../api/auth";

const PasswordLoginForm = ({ email, onSwitchMethod }) => {
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginWithPassword(email, password);

      if (res.user_id) {
        window.location.href = "/";
      } else {
        setErrMsg(res.data?.message || "Login failed.");
      }
    } catch (err) {
      setErrMsg(err.response?.data?.message || "OTP verification failed.");
      // console.error("handleLogin error:", err);
    }
  };

  return (
    <form className="auth-form password-login-form" onSubmit={handleLogin}>
      <label htmlFor="password" className="d-none">
        Email
      </label>
      <FormInput
        label="Password"
        type="password"
        id="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showPasswordIcons={true}
        errorMsg={errMsg}
      />

      <button type="submit" className="auth-btn">
        Login
      </button>

      <div className="auth-options">
        {/* <button type="button" className="link-btn">
          Forgot Password?
        </button> */}
        <div></div>
        <button
          type="button"
          className="link-btn"
          onClick={() => onSwitchMethod("otp")}
        >
          Login with OTP
        </button>
      </div>
    </form>
  );
};

export default PasswordLoginForm;
