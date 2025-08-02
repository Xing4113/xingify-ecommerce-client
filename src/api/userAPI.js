import api from "./axiosInstance";

export const fetchUserProfile = () => api.get("/user/profile");

export const logoutUser = () => api.post("/user/logoutUser");

export const updateEmail = (formData) =>
  api.patch("/user/updateEmail", {
    email: formData.email,
    otpCode: formData.otpCode,
  });

export const updateNamePhone = (formData) =>
  api.patch("/user/updateNamePhone", {
    name: formData.name,
    phone_number: formData.phone_number,
  });

export const updateAddress = (formData) =>
  api.patch("/user/updateAddress", {
    street_address: formData.street_address,
    unit_number: formData.unit_number,
    postal_code: formData.postal_code,
    city: formData.city,
  });

export const updatePassword = (formData) =>
  api.patch("/user/updatePassword", {
    current_password: formData.current_password,
    new_password: formData.new_password,
  });
