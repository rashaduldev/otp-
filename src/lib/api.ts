import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/frontend", // your backend URL
  withCredentials: true, // if backend uses cookies/session
});

// Request interceptor to automatically attach token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
