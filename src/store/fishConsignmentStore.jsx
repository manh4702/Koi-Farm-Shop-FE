// src/stores/fishConsignmentStore.jsx
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from '../api/axios.jsx';

const fishConsignmentStore = create(
  devtools((set) => ({
    fishConsignments: [],
    loading: false,
    error: null,

    // Fetch the consignments of a specific user by their userId
    fetchFishConsignmentsUser: async (userId) => {
      set({ loading: true, error: null });
      try {
        if (!userId) {
          throw new Error('User ID không được cung cấp.');
        }
        const response = await axios.get(`/api/FishConsignment/user/${userId}`);
        if (response.data.success) {
          set({ fishConsignments: response.data.data });
        } else {
          set({ error: response.data.message });
        }
      } catch (err) {
        set({ error: 'Có lỗi xảy ra khi tải danh sách kí gửi.' });
      } finally {
        set({ loading: false });
      }
    },

  }))
);

export default fishConsignmentStore;
