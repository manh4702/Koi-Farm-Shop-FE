import { create } from 'zustand';

const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (newOrders) => set({ orders: newOrders }),
}));

export default useOrderStore;
