// src/store/productStore.js
import create from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  setProducts: (newProducts) => set(() => ({ products: newProducts })),
}));

export default useProductStore;
