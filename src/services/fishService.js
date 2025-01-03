// src/services/fishService.js
import axios from '../api/axios';

export const fetchFishes = async () => {
  try {
    const response = await axios.get('/api/Fish');
    // return response.data;
    return response.data.map(fish => ({
      ...fish,
      productStatus: fish.productStatus || 'AVAILABLE' // Đảm bảo luôn có giá trị mặc định
    }));
  } catch (error) {
    console.error('Error fetching fishes:', error);
    throw error;
  }
};
export const getFishById = async (fishId) => {
  try {
    const response = await axios.get(`/api/Fish/${fishId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching fish by id (${fishId}):`, error);
    throw error;
  }
};

export const createFish = async (fishData) => {
  const formData = new FormData();
  formData.append('Name', fishData.name);
  formData.append('Age', fishData.age);
  formData.append('Gender', fishData.gender);
  formData.append('Size', fishData.size);
  formData.append('Description', fishData.description);
  formData.append('CategoryId', fishData.categoryId);
  formData.append('Price', fishData.price);
  formData.append('DailyFood', fishData.dailyFood);
  formData.append('QuantityInStock', fishData.quantityInStock);
  formData.append('Status', fishData.status);

  if (fishData.image && fishData.image instanceof File) {
    formData.append('ImageUrl', fishData.image, fishData.image.name);
  }

  try {
    const response = await axios.post('/api/Fish', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating fish:', error);
    throw error;
  }
};

export const deleteFish = async (fishId) => {
  const response = await axios.delete(`/api/Fish/${fishId}`);
  return response.data;
};

export const updateFish = async (fishId, fishData) => {
  const formData = new FormData();
  formData.append('Name', fishData.name?.toString() || '');
  formData.append('Age', fishData.age?.toString() || '');
  formData.append('Gender', fishData.gender?.toString() || '');
  formData.append('Size', fishData.size?.toString() || '');
  formData.append('Description', fishData.description?.toString() || '');
  formData.append('CategoryId', fishData.categoryId?.toString() || '');
  formData.append('Price', fishData.price?.toString() || '');
  formData.append('DailyFood', fishData.dailyFood?.toString() || '');
  // formData.append('QuantityInStock', fishData.quantityInStock);
  formData.append('ProductStatus', fishData.productStatus || '');

  if (fishData.image && fishData.image instanceof File) {
    formData.append('ImageUrl', fishData.image, fishData.image.name);
  }

  try {
    const response = await axios.put(`/api/Fish/${fishId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating fish (${fishId}):`, error);
    throw error;
  }
};