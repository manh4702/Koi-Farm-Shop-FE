// src/store/store.js
import { create } from "zustand";

import { decodeTokenProfile } from "../services/tokenProfile";

const profileStore = create((set) => ({
  user: null,
  token: localStorage.getItem("authToken") || null,
  role: localStorage.getItem("userRole") || null,
  expiration: localStorage.getItem("expiration") || null,
  email: localStorage.getItem("email") || null,
  phone: localStorage.getItem("phone") || null,
  setAuth: (authData) => {
    const expirationTime = Date.now() + 3 * 60 * 60 * 1000;
    set({
      user: { name: authData.username, role: authData.role, email: authData.email, phone: authData.phone },
      token: authData.token,
      role: authData.role,
      expiration: expirationTime,
      email: authData.email,
      phone: authData.phone,
    });
    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("userRole", authData.role);
    localStorage.setItem("expiration", expirationTime);
    localStorage.setItem("email", authData.email);
    localStorage.setItem("phone", authData.phone);
  },
  logout: (navigate) => {
    set({
      user: null,
      token: null,
      role: null,
      expiration: null,
      email: null,
      phone: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("expiration");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    if (navigate) {
      navigate("/login");
    }
  },
  initializeAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedUser = decodeTokenProfile(token);
      if (decodedUser) {
        set({ user: decodedUser, token, email: decodedUser.email, phone: decodedUser.phone });
      }
    }
  },
}));
export default profileStore;
