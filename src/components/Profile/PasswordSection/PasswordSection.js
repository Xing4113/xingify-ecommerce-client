import React, { useState } from "react";
import * as yup from "yup";
import FormInput from "../../FormInput/FormInput";
import axios from "axios";
import "./PasswordSection.scss";
import { useModal } from "../../../context/ModalContext";

const PasswordSection = ({ has_password, fetchUserProfile }) => {
  const schema = yup.object().shape({
    ...(has_password && {
      current_password: yup.string().required("Current password is required"),
    }),
    new_password: yup
      .string()
      .required("New password is required")
      .min(8, "Minimum 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_\-+={}[\]:";'<>?,./\\|]).*$/,
        "Password must contain upper, lower, number, and special character"
      ),
  });

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const { showModal } = useModal();

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

    if (formData.current_password === formData.new_password) {
      showModal(
        "error",
        "New password cannot be the same as your current password."
      );
      return;
    }
    setIsSubmitting(true);

    try {
      await axios.patch(
        "http://localhost:5000/user/updatePassword",
        {
          current_password: formData.current_password,
          new_password: formData.new_password,
        },
        { withCredentials: true }
      );

      await fetchUserProfile();
      showModal("success", "Password saved.");

      setFormData({ current_password: "", new_password: "" });
    } catch (err) {
      console.error("Update Password", err);
      showModal("error", "Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-section">
      <h3>Password</h3>
      <form onSubmit={handleSubmit} className="form-group">
        {has_password && (
          <FormInput
            label="Current Password*"
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            showPasswordIcons={true}
            errorMsg={errors.current_password}
            showValidation={showValidation}
          />
        )}

        <FormInput
          label="New Password*"
          type="password"
          name="new_password"
          value={formData.new_password}
          onChange={handleChange}
          showPasswordCondition={true}
          showPasswordIcons={true}
          showErrorMsg={false}
          errorMsg={errors.new_password}
          showValidation={showValidation}
        />

        <button
          type="submit"
          className="save-btn"
          disabled={isSubmitting || Object.values(errors).some((err) => !!err)}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PasswordSection;
