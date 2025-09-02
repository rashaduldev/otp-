import axios from "axios";

const api = axios.create({
  baseURL: "https://endpoint.rixetbd.com/api/v1/frontend/customer-register", // use https
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // যদি cookie/session লাগে
});

export default api;
