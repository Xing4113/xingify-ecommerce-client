import api from "./axiosInstance";

export const sendOtp = (email) => {
  return api.post("/auth/send-otp", { email });
};

export const verifyOtp = (email, otpEntered) => {
  return api.post("/auth/verify-otp", { email, otpEntered });
};

export const signUp = ({ name, email, password, otpCode }) => {
  return api.post("/auth/register", {
    name,
    email,
    password,
    otpEntered: otpCode,
  });
};

export const login = (email) => {
  return api.post("/auth/login", { email });
};

export const loginWithPassword = (email, password) => {
  return api.post("/auth/passwordLogin", { email, password });
};
