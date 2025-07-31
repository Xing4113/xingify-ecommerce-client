import axios from "axios";

export const sendOtp = async (email) => {
  const response = await axios.post("http://localhost:5000/auth/send-otp", {
    email,
  });
  return response.data;
};

export const verifyOtp = async (email, otpEntered) => {
  const response = await axios.post(
    "http://localhost:5000/auth/verify-otp",
    {
      email,
      otpEntered,
    },
    { withCredentials: true }
  );
  return response.data;
};

export const signUp = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/auth/register",
    {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      otpEntered: formData.otpCode,
    },
    { withCredentials: true }
  );
  return response.data;
};

export const login = async (email) => {
  const response = await axios.post("http://localhost:5000/auth/login", {
    email,
  });

  return response.data;
};

export const loginWithPassword = async (email, password) => {
  const response = await axios.post(
    "http://localhost:5000/auth/passwordLogin",
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return response.data;
};
