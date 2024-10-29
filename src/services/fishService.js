// src/services/fishService.js
import axios from '../api/axios';

export const fetchFishes = async () => {
  try {
    const response = await axios.get('/api/Fish');
    return response.data;
  } catch (error) {
    console.error('Error fetching fishes:', error);
    throw error;
  }
};
export const getFishById = async (id, fishId) => {
  try {
    const response = await axios.get(`/api/Fish/${id}`, {
      params: { fishId }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching fish by id (${id}):`, error);
    throw error;
  }
};