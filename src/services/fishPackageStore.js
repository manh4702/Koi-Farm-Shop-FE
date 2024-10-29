import {size} from "lodash";
import axios from "../api/axios";

const buildFormData = (data) => {
  const formData = new FormData();

  formData.append("Name", data.name || "");
  formData.append("Age", data.age?.toString() || "");
  formData.append("Gender", data.gender || "");
  formData.append("Size", data.size?.toString() || "");
  formData.append("Description", data.description || "");
  formData.append("TotalPrice", data.totalPrice?.toString() || "");
  formData.append("DailyFood", data.dailyFood?.toString() || "");
  formData.append("NumberOfFish", data.numberOfFish?.toString() || "");
  formData.append("Status", data.status || "");

  if (data.imageFiles && data.imageFiles.length > 0) {
    data.imageFiles.forEach((file) => {
      formData.append("ImageFile", file);
    });
  } else {
    formData.append("ImageFile", ""); // Append empty field if no file is provided
  }

  return formData;
};

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
        imageUrl: item.imageUrl,
        imageFile: item.imageFile,

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
    }
    // else {
    //   throw new Error(response.data.message || 'Failed to fetch fish packages');
    // }
  } catch (error) {
    console.error('Error fetching fish packages:', error);
    throw error;
  }
};

export const updateFishPackage = async (fishPackageId, updatedData) => {
  try {
    // const formData = new FormData();
    //
    // formData.append("Name", updatedData.name || "");
    // formData.append("Age", updatedData.age?.toString() || "");
    // formData.append("Gender", updatedData.gender || "");
    // formData.append("Size", updatedData.size?.toString() || "");
    // formData.append("Description", updatedData.description || "");
    // formData.append("TotalPrice", updatedData.totalPrice?.toString() || "");
    // formData.append("DailyFood", updatedData.dailyFood?.toString() || "");
    // formData.append("NumberOfFish", updatedData.numberOfFish?.toString() || "");
    // formData.append("Status", updatedData.status || "");

    // if (updatedData.imageFiles && updatedData.imageFiles.length > 0) {
    //   formData.append("ImageFile", updatedData.imageFiles[0].originFileObj);
    // }
    const formData = buildFormData(updatedData);

    const response = await axios.put(`/api/FishPackage/${fishPackageId}`, formData, {
      headers: {"Content-Type": "multipart/form-data"},
    });

    return response.data;
  } catch (error) {
    console.error('Error updating fish package:', error);
    throw error;
  }
};

export const createFishPackage = async (newData) => {
  try {
    const formData = buildFormData(newData);

    const response = await axios.post('/api/FishPackage', formData, {
      headers: {"Content-Type": "multipart/form-data"},
    });

    return response.data;
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