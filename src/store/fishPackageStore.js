// src/store/fishPackageStore.js
import { create } from "zustand";
import {
  getFishPackages,
  updateFishPackage,
  createFishPackage,
  deleteFishPackage,
  updateFishQuantities, getFishPackageById, deleteFishFromPackage, addFishToPackage
} from "../services/fishPackageService.js";

// Zustand store for fish packages
export const useFishPackageStore = create((set) => ({
  fishPackages: [],
  error: null,
  fetchFishPackages: async () => {
    try {
      const fishPackages = await getFishPackages();
      set({ fishPackages });
    } catch (error) {
      set({ error: error.message });
    }
  },
  fetchFishPackageById: async (id) => {
    try {
      const fishPackage = await getFishPackageById(id);
      set({ currentFishPackage: fishPackage, error: null });
    } catch (error) {
      set({ error: error.message });
    }
  },
  updateFishPackage: async (fishPackageId, formData) => {
    try {
      const result = await updateFishPackage(fishPackageId, formData);
      set((state) => ({
        fishPackages: state.fishPackages.map((item) =>
          item.fishPackageId === fishPackageId
            ? { ...item, ...result }
            : item
        ),
      }));
      return result;
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  },

  updateFishQuantities: async (formData) => {
    try {
      const result = await updateFishQuantities(formData);
      return result;
    } catch (error) {
      console.error('Update quantities error:', error);
      throw error;
    }
  },

  deleteFishFromPackage: async (packageId, categoryId) => {
    try {
      const result = await deleteFishFromPackage(packageId, categoryId);
      return result;
    } catch (error) {
      console.error('Delete fish error:', error);
      throw error;
    }
  },

  addFishToPackage: async (formData) => {
    try {
      const result = await addFishToPackage(formData);
      return result;
    } catch (error) {
      console.error('Add fish error:', error);
      throw error;
    }
  },
  
  
  createFishPackage: async (newData) => {
    try {
      const newFishPackage = await createFishPackage(newData);
      set((state) => ({
        fishPackages: [...state.fishPackages, newFishPackage],
      }));
      return newFishPackage;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  deleteFishPackage: async (id) => {
    try {
      await deleteFishPackage(id);
      set((state) => ({
        fishPackages: state.fishPackages.filter((item) => item.fishPackageId !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },


  // fetchFishPackages: async () => {
  //   const fishPackages = await getFishPackages();
  //   set({ fishPackages });
  // },
  // deleteFishPackage: async (id) => {
  //   await deleteFishPackage(id);
  //   set((state) => ({
  //     fishPackages: state.fishPackages.filter((pkg) => pkg.id !== id),
  //   }));
  // },
}));