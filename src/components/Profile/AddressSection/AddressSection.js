import React, { useState } from "react";
import * as yup from "yup";
import FormInput from "../../FormInput/FormInput";
import { updateAddress } from "../../../api/userAPI";
import { searchAddress } from "../../../api/externalAPI";
import "./AddressSection.scss";
import { useModal } from "../../../context/ModalContext";

const schema = yup.object().shape({
  street_address: yup.string().required("Please enter your street address"),
  unit_number: yup.string().notRequired(),
  postal_code: yup
    .string()
    .matches(/^\d{6}$/, "Please enter a valid postal code")
    .required("Please enter your postal code"),
});

const AddressSection = ({
  street_address,
  unit_number,
  postal_code,
  city,
  getUser,
}) => {
  const [formData, setFormData] = useState({
    street_address: street_address || "",
    unit_number: unit_number || "",
    postal_code: postal_code || "",
    city: city || "SINGAPORE",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const isPostalValid = formData.postal_code && !errors.postal_code;
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

    if (name === "postal_code") {
      if (!/^\d{6}$/.test(value.trim())) {
        setFormData((prev) => ({
          ...prev,
          street_address: "",
          unit_number: "",
        }));
        return;
      }

      try {
        const data = await searchAddress(value.trim());

        if (data.found > 0 && data.results[0]?.POSTAL === value.trim()) {
          const result = data.results[0];
          const block = result.BLK_NO?.trim() || "";
          const road = result.ROAD_NAME?.trim() || "";
          const street_address = block ? `${block} ${road}` : road;

          setFormData((prev) => ({
            ...prev,
            street_address,
          }));
          setErrors((prev) => ({
            ...prev,
            street_address: undefined,
            postal_code: undefined,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            street_address: "",
            unit_number: "",
          }));
          setErrors((prev) => ({
            ...prev,
            postal_code: "Invalid postal code",
          }));

          setShowValidation(true);
        }
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          postal_code: "Failed to validate postal code",
        }));
        if (process.env.NODE_ENV !== "production") {
          console.error("validate address ", err);
        }
      }
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
      await updateAddress(formData);
      await getUser();
      showModal("success", "Address updated successfully.");
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Update Address ", err);
      }
      showModal("error", "Failed to update. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-section">
      <h3>Address</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <FormInput
          label="Street Address*"
          type="text"
          name="street_address"
          value={formData.street_address}
          onChange={handleChange}
          errorMsg={errors.street_address}
          showValidation={showValidation}
          disabled={!isPostalValid}
        />

        <FormInput
          label="Unit Number (optional)"
          name="unit_number"
          value={formData.unit_number}
          onChange={handleChange}
          disabled={!isPostalValid}
        />

        <FormInput
          label="Postal Code*"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
          errorMsg={errors.postal_code}
          showValidation={showValidation}
        />

        <FormInput
          label="City"
          type="text"
          name="city"
          value={formData.city}
          disabled={true}
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

export default AddressSection;
