// src/store/store.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  email: localStorage.getItem("email") || null,
  token: localStorage.getItem("authToken") || null,
  role: localStorage.getItem("userRole") || null,
  setAuth: (authData) => {
    set({
      email: authData.email,
      token: authData.token,
      role: authData.role,
    });
    localStorage.setItem("email", authData.email);
    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("userRole", authData.role);
  },
  logout: () => {
    set({
      email: null,
      token: null,
      role: null,
    });
    localStorage.removeItem("email");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
  },
}));

export default useAuthStore;
