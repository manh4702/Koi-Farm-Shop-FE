// import { create } from 'zustand';

// const useOrderStore = create((set) => ({
//   orders: [],
//   setOrders: (newOrders) => set({ orders: newOrders }),
// }));

// export default useOrderStore;


import { create } from 'zustand';

// Lưu trữ vào localStorage
const persistOrders = (orders) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

// Lấy dữ liệu từ localStorage
const getPersistedOrders = () => {
  const storedOrders = localStorage.getItem('orders');
  return storedOrders ? JSON.parse(storedOrders) : [];
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
