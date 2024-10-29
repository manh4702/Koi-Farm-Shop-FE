import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      // Tìm sản phẩm trùng `id` và `fishId` hoặc `isLot`
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.fishId === item.fishId
      );

      if (existingItem) {
        // Nếu đã tồn tại, tăng số lượng
        return {
          items: state.items.map((i) =>
            i.id === item.id && i.fishId === item.fishId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      // Nếu chưa có, thêm sản phẩm mới
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));

export default useCartStore;
