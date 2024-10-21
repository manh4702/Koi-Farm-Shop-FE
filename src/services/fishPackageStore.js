import { size } from "lodash";
import axios from "../api/axios";

// Function to fetch fish packages with pagination
export const getFishPackages = async () => {
  try {
    const response = await axios.get('/api/FishPackage', {
      params: {
        page: 1,
        pageSize: 100,
      },
    });
    if (response.data.success) {
      // Format the data here
      const formattedData = response.data.data.listData.map((item) => ({
        fishPackageId: item.fishPackageId.toString(),
        name: item.name,
        description: item.description,
        price: `${item.totalPrice} VND`,
        image: item.imageUrl,
        // year: new Date().getFullYear() - item.age, // Calculate year based on age
        // origin: "Nhật Bản", // Hardcoded since API does not provide this
        // seller: "On Koi Farm", // Hardcoded since API does not provide this
        age: item.age,
        size: item.size,
        gender: item.gender,
        dailyFood: item.dailyFood,
        numberOfFish: item.numberOfFish,
        // fishes: [], // The API does not provide fish details
        // video: "", // The API does not provide a video link
        status: item.status,
      }));
      return formattedData;
    } else {
      throw new Error(response.data.message || 'Failed to fetch fish packages');
    }
  } catch (error) {
    console.error('Error fetching fish packages:', error);
    throw error;
  }
};

export const updateFishPackage = async (id, updatedData) => {
  try {
    const response = await axios.put(`/api/FishPackage/${id}`, updatedData);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to update fish package');
    }
  } catch (error) {
    console.error('Error updating fish package:', error);
    throw error;
  }
};


export const createFishPackage = async (newData) => {
  try {
    const response = await axios.post('/api/FishPackage', newData);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to create fish package');
    }
  } catch (error) {
    console.error('Error creating fish package:', error);
    throw error;
  }
};

export const deleteFishPackage = async (id) => {
  try {
    const response = await axios.delete(`/api/FishPackage/${id}`);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to delete fish package');
    }
  } catch (error) {
    console.error('Error deleting fish package:', error);
    throw error;
  }
};