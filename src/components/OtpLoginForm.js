import React, { useState, useEffect } from "react";
import FormInput from "./FormInput/FormInput";
import { formatTimer } from "../utils/time";
import { sendOtp, verifyOtp } from "../api/auth";
import { useModal } from "../context/ModalContext";

const OtpLoginForm = ({
  email,
  onSwitchMethod,
  otpTimer,
  setOtpTimer,
  hasSentOtpRef,
}) => {
  const { showModal } = useModal();
  const [otpEntered, setOtpEntered] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!hasSentOtpRef.current) {
      hasSentOtpRef.current = true;

      const sendInitialOtp = async () => {
        try {
          await sendOtp(email);
          setOtpTimer(45); // 1 minutes countdown
          showModal("success", "OTP has been sent to your email.");
        } catch (err) {
          setErrorMsg(err.response?.data?.message || "Failed to send OTP.");
          showModal("error", "Failed to send OTP. Please try again.");
        }
      };

      sendInitialOtp();
    }
  }, [email, hasSentOtpRef]);

  const handleSendOtp = async () => {
    if (otpTimer > 0 && hasSentOtpRef.current) return; // Prevent spamming
    showModal("loading");

    try {
      await sendOtp(email);
      setOtpTimer(60); // 1 minutes countdown
      showModal("success", "OTP has been sent to your email.");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to resend OTP.");
      showModal("error", "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpEntered.trim()) {
      setErrorMsg("Please enter your OTP.");
      return;
    }

    try {
      const res = await verifyOtp(email, otpEntered);

      if (res.user_id) {
        window.location.href = "/";
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <form className="auth-form otp-login-form" onSubmit={handleVerifyOtp}>
      <FormInput
        label="Enter 6-digit code"
        type="text"
        id="otpCode"
        name="otpCode"
        autoComplete="one-time-code"
        value={otpEntered}
        onChange={(e) => setOtpEntered(e.target.value)}
        maxLength="6"
        errorMsg={errorMsg}
      />

      <button type="submit" className="auth-btn">
        Verify OTP
      </button>

      <div className="auth-options">
        <button
          type="button"
          className={`link-btn ${otpTimer > 0 ? "disable-link-btn" : ""}`}
          onClick={handleSendOtp}
          disabled={otpTimer > 0}
        >
          {otpTimer > 0
            ? `Resend OTP (${formatTimer(otpTimer)})`
            : "Resend OTP"}
        </button>

        <button
          type="button"
          className="link-btn"
          onClick={() => onSwitchMethod("password")}
        >
          Login with Password
        </button>
      </div>
    </form>
  );
};

export default OtpLoginForm;
