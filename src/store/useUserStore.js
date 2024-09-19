import { create } from 'zustand';

const useUserStore = create((set) => ({
  totalUsers: 100,
  activeSessions: 25,
  serverStatus: 'Running',
  updateUsers: (newCount) => set({ totalUsers: newCount }),
  updateSessions: (newCount) => set({ activeSessions: newCount }),
}));

export default useUserStore;
