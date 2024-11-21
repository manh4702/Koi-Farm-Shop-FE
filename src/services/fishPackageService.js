//src/services/fishPackageService
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
      formData.append("ImageUrl", file);
    });
  } else {
    formData.append("ImageUrl", ""); // Append empty field if no file is provided
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

    return response.data.data.listData;
    // return fishPackages;
  } catch (error) {
    console.error('Error fetching fish packages:', error);
    throw error;
  }
};

export const getFishPackagesCustomer = async () => {
  try {
    const response = await axios.get('/api/FishPackage/Displayable');
    return response.data.data.map(fish => ({
      ...fish,
      productStatus: fish.productStatus,
    }));
  } catch (error) {
    console.error('Error fetching fish packages:', error);
    throw error;
  }
};

export const getFishPackageById = async (id) => {
  try {
    const response = await axios.get(`/api/FishPackage/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch fish package');
  } catch (error) {
    console.error('Error fetching fish package:', error);
    throw error;
  }
};

export const updateFishPackage = async (fishPackageId, formData) => {
  try {
    const response = await axios.put(`/api/FishPackage/${fishPackageId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to update fish package');
  } catch (error) {
    console.error('Error updating fish package:', error);
    throw error;
  }
};

export const updateFishQuantities = async (formData) => {
  try {
    const response = await axios.put('/api/FishPackage/UpdateQuantity', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to update fish quantities');
  } catch (error) {
    console.error('Error updating fish quantities:', error);
    throw error;
  }
};

export const deleteFishFromPackage = async (packageId, categoryId) => {
  try {
    const response = await axios.delete(`/api/FishPackage/DeleteFishInPackage/${packageId}&&${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addFishToPackage = async (formData) => {
  try {
    const response = await axios.post('/api/FishPackage/AddFish', formData, {
      headers: {"Content-Type": "multipart/form-data"},
    });
    return response.data;
  } catch (error) {
    console.error('Error adding fish to package:', error);
    throw error;
  }
};

export const createFishPackage = async (formData) => {
  try {
    // const formData = buildFormData(formData);
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