import axios from "axios";

fetch("https://suhanasafar.onrender.com/api/health").catch(() => {});

const API = axios.create({
  baseURL: "https://suhanasafar.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;