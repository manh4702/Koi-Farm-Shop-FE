// src/store/store.js
import {create} from "zustand";
import {decodeToken} from "../services/tokenDecoder";
import useCartStore from "./cartStore.js";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("authToken") || null,
  role: localStorage.getItem("userRole") || null,
  expiration: localStorage.getItem("expiration") || null,
  userId: sessionStorage.getItem("userId") || null,
  cartItems: [],
  setAuth: (authData) => {
    const expirationTime = Date.now() + 3 * 60 * 60 * 1000;
    set({
      user: {name: authData.username, role: authData.role},
      token: authData.token,
      role: authData.role,
      expiration: expirationTime,
      userId: authData.userId,
    });
    localStorage.setItem("authToken", authData.token);
    localStorage.setItem("userRole", authData.role);
    localStorage.setItem("expiration", expirationTime);
    sessionStorage.setItem("userId", authData.userId);
  },
  setCartItems: (cartItems) => set({cartItems}),
  logout: (navigate) => {
    const {clearCart} = useCartStore.getState();
    clearCart();

    set({
      user: null,
      token: null,
      role: null,
      expiration: null,
      userId: null,
      // cartItems: [],
    });

    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("expiration");
    sessionStorage.removeItem("userId");
    if (navigate) {
      navigate("/login");
    }
  },
  initializeAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        set({user: decodedUser, token});
        sessionStorage.setItem("userId", decodedUser.userId);
      }
    }
  },
}));

export default useAuthStore;
