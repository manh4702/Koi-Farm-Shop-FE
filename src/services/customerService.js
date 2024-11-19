// src/services/customerService.js
import axios from "../api/axios"; // Import the configured axios instance

// Function to fetch the user profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get("/api/User/profile");
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Failed to load user profile");
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put("/api/User/profile", profileData);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Failed to update user profile");
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.put(`/api/User/deleteUser/${userId}`);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getOrderHistory = async (userId) => {
  try {
    const response = await axios.get(`/api/Order/user/${userId}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch order history");
    }
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};