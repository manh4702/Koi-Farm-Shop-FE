import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  isLoggedIn: !!Cookies.get('isLoggedIn'),
  login: (username) => {
    Cookies.set('isLoggedIn', username);
    set({ isLoggedIn: true });
  },
  logout: () => {
    Cookies.remove('isLoggedIn');
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;
