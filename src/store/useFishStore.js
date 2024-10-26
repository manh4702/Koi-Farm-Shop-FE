// src/store/useFishStore.js
import {create} from 'zustand'

const useFishStore = create((set) => ({
  fishPackages: [],
  totalRecords: 0,
  currentPage: 1,
  setFishPackages: (data) => set({ fishPackages: data }),
  setTotalRecords: (total) => set({ totalRecords: total }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useFishStore;