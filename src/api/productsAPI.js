import api from "./axiosInstance";

export const fetchFilteredProducts = (params) =>
  api.get("/product", { params });

export const getProductById = (productId) => api.get(`/product/${productId}`);
