import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  role: null,
  setAuth: (token, role) => set({ token, role }),
  clearAuth: () => set({ token: null, role: null }),
}));

export default useAuthStore;