import create from 'zustand';
import { fetchUsersByRole, updateUser } from '../services/userService';

const useCustomerStore = create((set) => ({
  customers: [],
  loading: false,
  fetchCustomers: async () => {
    set({ loading: true });
    try {
      const customersData = await fetchUsersByRole(4);
      set({ customers: customersData, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  updateCustomer: async (userId, updatedData) => {
    try {
      await updateUser(userId, updatedData);
      set((state) => ({
        customers: state.customers.map(customer =>
          customer.userId === userId ? { ...customer, ...updatedData } : customer
        )
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));

export default useCustomerStore;