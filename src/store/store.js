// src/store/store.js
import { create } from "zustand";
import { decodeToken } from "../services/tokenDecoder";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("authToken") || null,
  role: localStorage.getItem("userRole") || null,
  expiration: localStorage.getItem("expiration") || null,
  setAuth: (authData) => {
    const expirationTime = Date.now() + 3 * 60 * 60 * 1000;
    set({
      token: authData.token,
      role: authData.role,
      expiration: expirationTime,
    });
    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("userRole", authData.role);
    localStorage.setItem("expiration", expirationTime);
  },
  logout: (navigate) => {
    set({
      token: null,
      role: null,
      expiration: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("expiration");
    if (navigate) {
      navigate("/login");
    }
  },
  initializeAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        set({ user: decodedUser, token });
      }
    }
  },
}));

export default useAuthStore;
