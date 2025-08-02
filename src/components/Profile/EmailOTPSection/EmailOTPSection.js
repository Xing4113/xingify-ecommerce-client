import React, { useEffect, useState } from "react";
import * as yup from "yup";
import FormInput from "../../FormInput/FormInput";
import { sendOtp } from "../../../api/authAPI";
import axios from "axios";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./EmailOTPSection.scss";
import { useModal } from "../../../context/ModalContext";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email"),
  otpCode: yup.string().required("OTP code is required"),
});

const EmailOTPSection = ({ currentEmail, isEmailVerified, getUser }) => {
  const [formData, setFormData] = useState({
    email: currentEmail || "",
    otpCode: "",
  });

  const [errors, setErrors] = useState({});
  const [otpTimer, setOtpTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const { showModal } = useModal();

  useEffect(() => {
    let countdown;
    if (otpTimer > 0) {
      countdown = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [otpTimer]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    try {
      await schema.validateAt(name, updated);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleSendOtp = async () => {
    if (otpTimer > 0) return;
    try {
      await sendOtp(formData.email);
      setOtpTimer(60);
      showModal("success", "OTP has been sent to your email.");
    } catch (err) {
      showModal("error", "Failed to send OTP. Please try again.");
    }
  };

  const validateAll = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const mapped = err.inner.reduce((acc, e) => {
        acc[e.path] = e.message;
        return acc;
      }, {});
      setErrors(mapped);
      return false;
    } finally {
      setShowValidation(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateAll();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      await axios.patch(
        "http://localhost:5000/user/updateEmail",
        {
          email: formData.email,
          otpCode: formData.otpCode,
        },
        { withCredentials: true }
      );

      showModal("success", "Your email has been verified successfully.");

      await getUser();

      setFormData((prev) => ({ ...prev, otpCode: "" }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        otpCode: err.response?.data?.otpError || "Failed to verify OTP.",
      }));
      showModal("error", "Email verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-section">
      <h3>Email Verification</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <FormInput
          label="Email*"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          errorMsg={errors.email}
          showValidation={showValidation}
        />

        <FormInput
          label="Code*"
          type="text"
          name="otpCode"
          value={formData.otpCode}
          onChange={handleChange}
          showSendOtpButton={true}
          handleSendCode={handleSendOtp}
          otpTimer={otpTimer}
          errorMsg={errors.otpCode}
          showValidation={showValidation}
        />

        <div className="form-footer-row">
          <div className="verify-status-container">
            {formData.email === currentEmail ? (
              <div
                className={`verify-status ${
                  isEmailVerified ? "verified" : "not-verified"
                }`}
              >
                {isEmailVerified ? (
                  <>
                    <AiOutlineCheckCircle size={18} color="green" />
                    <span>Email Verified</span>
                  </>
                ) : (
                  <>
                    <AiOutlineCloseCircle size={18} color="red" />
                    <span>Email Not Verified</span>
                  </>
                )}
              </div>
            ) : (
              <div className="verify-status invisible-placeholder" />
            )}
          </div>

          <button
            type="submit"
            className="save-btn"
            disabled={
              isSubmitting || Object.values(errors).some((err) => !!err)
            }
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailOTPSection;
