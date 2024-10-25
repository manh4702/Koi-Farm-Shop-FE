// src/services/fishPackageService.js
import axios from "../api/axios.jsx";

export const getFishPackages = async (page = 1, pageSize = 12) => {
  try {
    const response = await axios.get(`/api/FishPackage`, {
      params: { page, pageSize },
    });

    if (response.data.success) {
      return response.data.data.listData;
    } else {
      throw new Error(response.data.message || "Failed to fetch fish packages");
    }
  } catch (error) {
    console.error("Error fetching fish packages:", error);
    throw error;
  }
};
