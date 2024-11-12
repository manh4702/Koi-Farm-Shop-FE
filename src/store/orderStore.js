// src/stores/orderStore.js
import { create } from 'zustand';
import useCartStore from "@/store/cartStore.js";
import axios from "@/api/axios.jsx";

const useOrderStore = create((set) => ({
  orders: [],
  fetchOrders: async () => {
    try {
      const response = await axios.get('/api/Order');
      if (response.data.success) {
        set({ orders: response.data.data.listData.map(order => ({
            id: order.orderId,
            customer: order.userName,
            status: order.status,
            total: order.totalPrice,
            date: order.orderDate,
            paymentMethod: order.paymentMethod,
            address: `${order.address.street}, ${order.address.city}, ${order.address.district}`,
            phone: order.phone, // Assuming phone is not provided
            products: order.items.map(item => ({
              name: item.fishName,
              quantity: item.quantity,
              price: item.price,
              image: item.fishImage
            })),
            description: 'No description provided' // Placeholder if no description
          })) });
      } else {
        console.error('Failed to fetch orders:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },
  setOrders: (orders) => set({ orders }),

  deleteOrder: async (orderId) => {
    try {
      await axios.delete(`/api/Order/${orderId}`);
      set((state) => ({
        orders: state.orders.filter(order => order.id !== orderId),
      }));
    } catch (error) {
      console.error(`Failed to delete order ${orderId}:`, error);
      throw error;
    }
  },

  changeOrderStatus: async (orderId, status) => {
    try {
      // console.log(`Changing order ${orderId} status to ${status}`); // Debug log

      const response = await axios.patch(`/api/Order/ChangeStatus/${orderId}&&${status}`);

      if (response.data.success) {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to change order status');
      }
    } catch (error) {
      console.error(`Failed to change status of order ${orderId}:`, error);
      throw error.response?.data || error;
    }
  },
  
  placeOrder: async (orderData) => {
    try {
      const userId = sessionStorage.getItem('userId');
      if (!userId) throw new Error('User ID not found');

     
      
      const formData = new FormData();

      // Add order data to formData
      formData.append('UserId', userId);
      formData.append('IsSent', orderData.isSent);
      formData.append('PaymentMethod', orderData.paymentMethod);
      formData.append('CreateAddressDTO.Street', orderData.address);
      formData.append('CreateAddressDTO.City', orderData.city);
      formData.append('CreateAddressDTO.District', orderData.district);
      

      // Make API call
      const response = await axios.post('/api/Order/IncludeItems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });


      set(() => ({ orderData: response.data }));

      return response.data;
    } catch (error) {
      console.error('API Error:', error.response || error); // Debug log
      throw error.response?.data || error;
    }
  },
}));

export default useOrderStore;
