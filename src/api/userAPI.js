import api from "./axiosInstance";

export const fetchJwtToken = () => api.get("/getJwtToken");

export const fetchUserProfile = () => api.get("/user/profile");

export const logoutUser = () => api.get("/user/profile");
