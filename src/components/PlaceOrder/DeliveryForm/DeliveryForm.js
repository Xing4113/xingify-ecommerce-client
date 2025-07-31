import FormInput from "../../FormInput/FormInput";

const DeliveryForm = ({ formData, errors, showValidation, handleChange }) => {
  const isPostalValid = formData.postalCode && !errors.postalCode;

  return (
    <div className="delivery-info-form">
      <FormInput
        label="Email"
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        errorMsg={errors.email}
        showValidation={showValidation}
        infoNote="We'll keep you updated about your order via email."
      />

      <div className="break-line"></div>

      <FormInput
        label="Name"
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        errorMsg={errors.name}
        showValidation={showValidation}
      />

      <FormInput
        label="Street Address"
        name="streetAddress"
        id="streetAddress"
        value={formData.streetAddress}
        onChange={handleChange}
        errorMsg={errors.streetAddress}
        showValidation={showValidation}
        disabled={!isPostalValid}
      />

      <FormInput
        label="Unit Number (optional)"
        name="unitNumber"
        id="unitNumber"
        value={formData.unitNumber}
        onChange={handleChange}
        disabled={!isPostalValid}
      />

      <FormInput
        label="Postal Code"
        type="digit"
        name="postalCode"
        id="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        errorMsg={errors.postalCode}
        showValidation={showValidation}
      />

      <FormInput
        label="City"
        name="city"
        id="city"
        value={formData.city}
        onChange={handleChange}
        disabled
      />

      <div className="break-line"></div>

      <FormInput
        label="Phone Number (+65)"
        type="digit"
        name="phoneNumber"
        id="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        errorMsg={errors.phoneNumber}
        showValidation={showValidation}
        infoNote="You may be contacted to confirm your delivery details."
      />

      <div className="break-line"></div>
    </div>
  );
};

export default DeliveryForm;
