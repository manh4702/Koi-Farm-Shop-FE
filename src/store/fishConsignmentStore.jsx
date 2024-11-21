// src/stores/fishConsignmentStore.jsx
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import axios from '../api/axios.jsx';
import {message} from 'antd';
import {fetchUsersByRole} from "@/services/userService.js";


const fishConsignmentStore = create(
  devtools((set) => ({
    fishConsignments: [],
    loading: false,
    error: null,

    // Fetch the consignments of a specific user by their userId
    fetchFishConsignmentsUser: async (userId) => {
      set({loading: true, error: null});
      try {
        if (!userId) {
          throw new Error('User ID không được cung cấp.');
        }
        const response = await axios.get(`/api/FishConsignment/user/${userId}`);
        if (response.data.success) {
          set({fishConsignments: response.data.data});
        } else {
          set({error: response.data.message});
        }
      } catch (err) {
        set({error: 'Có lỗi xảy ra khi tải danh sách kí gửi.'});
      } finally {
        set({loading: false});
      }
    },

    fetchFishConsignments: async () => {
      set({loading: true, error: null});
      try {
        const users = await fetchUsersByRole("Customer");
        const userMap = new Map(users.map((user) => [user.userId, user.fullName || user.userName]));
        
        const response = await axios.get(`/api/FishConsignment`);
        const data = response.data;
        const transformedData = response.data.map((item) => ({
          ...item,
          owner: userMap.get(item.userId) || "Không xác định",
        }));
        set({fishConsignments: transformedData});
        
      } catch (err) {
        set({error: 'Có lỗi xảy ra khi tải danh sách kí gửi.'});
        return [];
      } finally {
        set({loading: false});
      }
    },

    createFishConsignmentSell: async (formData) => {
      set({loading: true, error: null});
      try {
        const response = await axios.post(`/api/FishConsignment/sale`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        });
        if (response.data.success) {
          message.success('Đơn ký gửi đã được tạo thành công!');
        } else {
          throw new Error(response.data.message || 'Tạo đơn ký gửi thất bại.');
        }
      } catch (err) {
        message.error(err.message || 'Có lỗi xảy ra khi tạo đơn ký gửi.');
        set({error: err.message});
      } finally {
        set({loading: false});
      }
    },
    approveFishConsignment: async (consignmentId, approvalData) => {
      set({loading: true, error: null});
      try {
        const response = await axios.post(`/api/FishConsignment/approve/${consignmentId}`, approvalData, {
          headers: {'Content-Type': 'application/json'},
        });

        if (response.data.success) {
          message.success('Ký gửi đã được phê duyệt thành công!');
          // Optional: Update the local state if needed
          set((state) => ({
            fishConsignments: state.fishConsignments.map((item) =>
              item.id === consignmentId ? {...item, status: 'approved'} : item
            ),
          }));
        } else {
          throw new Error(response.data.message || 'Phê duyệt ký gửi thất bại.');
        }
      } catch (err) {
        message.error(err.message || 'Có lỗi xảy ra khi phê duyệt ký gửi.');
        set({error: err.message});
      } finally {
        set({loading: false});
      }
    },
  }))
);

export default fishConsignmentStore;
