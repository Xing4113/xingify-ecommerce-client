import React, { useState, useEffect } from "react";
import * as yup from "yup";
import FormInput from "./FormInput/FormInput";
import { sendOtp, signUp } from "../api/authAPI";
import { useModal } from "../context/ModalContext";

// Define Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "minLength")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_\-+={}[\]:";'<>?,./\\|]).*$/,
      "isComplex"
    ),
  otpCode: yup.string().required("Code is required"),
});

const SignUpForm = ({ email }) => {
  const { showModal, hideModal } = useModal();

  const [formData, setFormData] = useState({
    email,
    name: "",
    password: "",
    otpCode: "",
  });

  const [otpTimer, setOtpTimer] = useState(0);
  const [errors, setErrors] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSendOtp = async () => {
    if (otpTimer > 0) return; // Prevent spamming
    try {
      await sendOtp(email);
      setOtpTimer(60); // 1 minutes countdown
      showModal("success", "OTP has been sent to your email.");
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error(err.response?.data?.message || "Failed to resend OTP.");
      }
      showModal("error", "Failed to send OTP. Please try again.");
    }
  };

  // Real-time validation on change
  const handleChange = async (e) => {
    const { name, value } = e.target;

    const newValue = name === "name" ? value.toUpperCase() : value;

    const updatedData = { ...formData, [name]: newValue };
    setFormData(updatedData);

    try {
      await schema.validateAt(name, updatedData);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const validateAll = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errMap = err.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setErrors(errMap);
      return false;
    } finally {
      setShowValidation(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateAll();
    if (!isValid) return;

    showModal("loading");

    try {
      const res = await signUp(formData);

      if (res.data.user_id) {
        window.location.href = "/";
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error(err);
      }
      setErrors((prev) => ({
        ...prev,
        ["otpCode"]: err.response?.data?.otpError,
      }));
      showModal("error", err.response?.data?.errMsg);
    }
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <FormInput
        label="Name*"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        errorMsg={errors.name}
        showValidation={showValidation}
      />

      <FormInput
        label="Password*"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        showPasswordCondition={true}
        showPasswordIcons={true}
        showErrorMsg={false}
        errorMsg={errors.password}
        showValidation={showValidation}
      />

      <FormInput
        label="Code*"
        type="text"
        id="otpCode"
        name="otpCode"
        value={formData.otpCode}
        onChange={handleChange}
        showSendOtpButton={true}
        handleSendCode={handleSendOtp}
        otpTimer={otpTimer}
        errorMsg={errors.otpCode}
        showValidation={showValidation}
      />

      <button className="auth-btn" type="submit" disabled={isSubmitting}>
        Sign Up
      </button>

      {errors.server && <p className="error-msg">{errors.server}</p>}
    </form>
  );
};

export default SignUpForm;
