// src/store/store.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  email: localStorage.getItem("email") || null,
  token: localStorage.getItem("authToken") || null,
  role: localStorage.getItem("userRole") || null,
  expiration: localStorage.getItem("expiration") || null,
  setAuth: (authData) => {
    const expirationTime = Date.now() + 3 * 60 * 60 * 1000;
    set({
      email: authData.email,
      token: authData.token,
      role: authData.role,
      expiration: expirationTime,
    });
    localStorage.setItem("email", authData.email);
    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("userRole", authData.role);
    localStorage.setItem("expiration", expirationTime);
  },
  logout: (navigate) => {
    set({
      email: null,
      token: null,
      role: null,
      expiration: null,
    });
    localStorage.removeItem("email");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("expiration");
    if (navigate) {
      navigate("/login");
    }
  },
}));

export default useAuthStore;
