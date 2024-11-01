// stores/categoryStore.js
import { create } from 'zustand';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/CategoryService.js';

const setCategoriesToSessionStorage = (categories) => {
  const simplifiedCategories = categories.map(({ categoryId, name }) => ({ categoryId, name }));
  sessionStorage.setItem('categories', JSON.stringify(simplifiedCategories));
};

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async (page, pageSize) => {
    set({ loading: true, error: null });
    try {
      const data = await getCategories(page, pageSize);
      set({ categories: Array.isArray(data) ? data : [], loading: false });
      setCategoriesToSessionStorage(data);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addCategory: async (categoryData) => {
    try {
      const response = await createCategory(categoryData);
      if (response.data) {
        set((state) => ({
          categories: [response.data, ...state.categories]
        }));
      }
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await updateCategory(id, categoryData);
      if (response.data) {
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? response.data : cat
          ),
        }));
      }
    } catch (error) {
      throw error;
    }
  },

  removeCategory: async (id) => {
    try {
      await deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
      }));
    } catch (error) {
      throw error;
    }
  },
}));

export default useCategoryStore;