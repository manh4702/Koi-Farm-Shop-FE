

import { create } from 'zustand';

// Lưu trữ vào localStorage
const persistOrders = (orders) => {
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Error persisting orders:', error);
  }
};

// Lấy dữ liệu từ localStorage
const getPersistedOrders = () => {
  try {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch (error) {
    console.error('Error getting persisted orders:', error);
    return [];
  }
};

const useOrderStore = create((set) => ({
  // Bắt đầu với dữ liệu từ localStorage
  orders: getPersistedOrders(),

  setOrders: (newOrders) => {
    persistOrders(newOrders); // Lưu vào localStorage
    set({ orders: newOrders });
  },

  addOrder: (order) => {
    set((state) => {
      const updatedOrders = [...state.orders, order];
      persistOrders(updatedOrders); // Lưu vào localStorage
      return { orders: updatedOrders };
    });
  },

  updateOrderStatus: (orderId, newStatus) => {
    set((state) => {
      const updatedOrders = state.orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      persistOrders(updatedOrders); // Lưu vào localStorage
      return { orders: updatedOrders };
    });
  },

  removeOrder: (orderId) => {
    set((state) => {
      const updatedOrders = state.orders.filter(
        (order) => order.id !== orderId
      );
      persistOrders(updatedOrders); // Lưu vào localStorage
      return { orders: updatedOrders };
    });
  },
}));

export default useOrderStore;
