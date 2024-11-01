import { create } from "zustand";
import axios from "../api/axios.jsx";

const useCartStore = create((set, get) => ({
  items: [],

  addItem: async (item, userCartId) => {
    const state = get();
    const existingItem = state.items.find(
      (i) => (item.fishId ? i.fishId === item.fishId : i.packageId === item.packageId)
    );

    if (existingItem) {
      set({
        items: state.items.map((i) =>
          (item.fishId ? i.fishId === item.fishId : i.packageId === item.packageId)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      const newItem = { ...item, quantity: 1 };
      set({ items: [...state.items, newItem] });

      try {
        if (item.fishId) {
          await axios.post('/api/CartItem/FishSingle', {
            userCartId: userCartId, // replace with actual userCartId
            fishId: item.fishId,
            quantity: newItem.quantity,
          });
        } else if (item.packageId) {
          await axios.post('/api/CartItem/FishPackage', {
            userCartId: userCartId, // replace with actual userCartId
            packageId: item.packageId,
          });
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        // Optionally, revert state update here if API request fails
      }
    }
  },

  removeItem: async (id) => {
    await set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
    // Optionally, make an API call to remove the item if necessary
  },

  updateQuantity: async (id, quantity) => {
    await set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
    // Optionally, make an API call to update the quantity if necessary
  },
}));

export default useCartStore;