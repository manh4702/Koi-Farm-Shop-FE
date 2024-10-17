import create from 'zustand';

const useAuthStore = create((set) => ({
  auth: {
    username: localStorage.getItem('username') || null,
    role: localStorage.getItem('userRole') || null,
    token: localStorage.getItem('authToken') || null,
  },
  setAuth: (authData) => {
    localStorage.setItem('authToken', authData.token);
    localStorage.setItem('userRole', authData.role);
    localStorage.setItem('username', authData.username);
    set({ auth: authData });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    set({ auth: { username: null, role: null, token: null } });
  },
}));

export default useAuthStore;
