// src/store/store.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  email: null,
  token: null,
  role: null,
  setAuth: (authData) =>
    set({
      email: authData.email,
      token: authData.token,
      role: authData.role,
    }),
  logout: () =>
    set({
      email: null,
      token: null,
      role: null,
    }),
}));

export default useAuthStore;
