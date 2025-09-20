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
    const accessToken = Cookies.get("accessToken");

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
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = Cookies.get("refreshToken");
        // Make request to auth server to refresh token
        const { data } = await api.post("/refresh-token", {
          refreshToken: token,
        });

        const { accessToken, refreshToken } = data;
        // Set the new tokens on browser cookie
        Cookies.set("accessToken", accessToken, { expires: 7 });
        Cookies.set("refreshToken", refreshToken, { expires: 7 });
        // Update the authorization header with the new access token
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        if (originalRequest.url.includes("/logout")) {
          originalRequest.data = JSON.stringify({ refreshToken });
        }

        return api(originalRequest); // Retry the request with th new access token
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return as is
  }
);

export default api;
