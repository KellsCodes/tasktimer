"use client";

import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// Add Authorization header automatically if token exists
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accesToken");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle expired token responses globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = Cookies.get("refreshToken");
      try {
        const { data } = await api.post("/refresh-token", {
          refreshToken: token,
        });
        console.log(data);
      } catch (refreshError) {
        console.error({refreshError});
        if (refreshError.response.status !== 500) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          localStorage.removeItem("user");
          // window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
