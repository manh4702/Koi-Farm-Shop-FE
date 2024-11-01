// src/store/fishStore.js
import { create } from 'zustand';
import {createFish, deleteFish, fetchFishes, getFishById} from '../services/fishService';

export const useFishStore = create((set) => ({
  fishes: [],
  selectedFish: null,
  loading: false,
  error: null,

  loadFishes: async () => {
    set({ loading: true, error: null });
    try {
      const fishes = await fetchFishes();
      set({ fishes, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  loadFishById: async (id) => {
    set({ loading: true, error: null });
    try {
      const fish = await getFishById(id);
      set({ selectedFish: fish, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createFish: async (fishData) => {
    set({ loading: true, error: null });
    try {
      const newFish = await createFish(fishData);
      set((state) => ({
        fishes: [newFish, ...state.fishes],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  removeFish: async (fishId) => {
    set({ loading: true, error: null });
    try {
      await deleteFish(fishId);
      set((state) => ({
        fishes: state.fishes.filter(fish => fish.id !== fishId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
