import React, { useState } from "react";
import * as yup from "yup";
import { updateNamePhone } from "../../../api/userAPI";
import FormInput from "../../FormInput/FormInput";
import "./NamePhoneSection.scss";
import { useModal } from "../../../context/ModalContext";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^[689]\d{7}$/, "Please enter a valid phone number"),
});

const NamePhoneSection = ({ name, phone_number, getUser }) => {
  const [formData, setFormData] = useState({
    name: name || "",
    phone_number: phone_number || "",
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

    setIsSubmitting(true);

    try {
      await updateNamePhone(formData);
      await getUser();
      showModal("success", "Updated successfully.");
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to update name/phone:", err);
      }
      showModal("error", "Failed to update. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-section">
      <h3>Personal Information</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <FormInput
          label="Name*"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          errorMsg={errors.name}
          showValidation={showValidation}
        />
        <FormInput
          label="Phone Number (+65)"
          type="digit"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          errorMsg={errors.phone_number}
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

export default NamePhoneSection;
