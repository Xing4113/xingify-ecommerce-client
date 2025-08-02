import api from "./axiosInstance";

export const addEmailSubscription = (email) =>
  api.post(`/email/addEmailSubscription`, {
    email,
  });
