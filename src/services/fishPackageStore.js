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

export const updateFishPackage = async (id, updatedData) => {
  try {
    const formData = new FormData();

    // Kiểm tra và thêm các trường dữ liệu vào formData nếu giá trị hợp lệ
    if (updatedData.name && updatedData.name.trim() !== "") formData.append("Name", updatedData.name);
    if (updatedData.age !== undefined && !isNaN(updatedData.age)) formData.append("Age", updatedData.age);
    if (updatedData.gender && ["Male", "Female"].includes(updatedData.gender)) formData.append("Gender", updatedData.gender);
    if (updatedData.size !== undefined && !isNaN(updatedData.size)) formData.append("Size", updatedData.size);
    if (updatedData.description && updatedData.description.trim() !== "") formData.append("Description", updatedData.description);
    if (updatedData.totalPrice !== undefined && !isNaN(updatedData.totalPrice)) formData.append("TotalPrice", updatedData.totalPrice);
    if (updatedData.dailyFood !== undefined && !isNaN(updatedData.dailyFood)) formData.append("DailyFood", updatedData.dailyFood);
    if (updatedData.numberOfFish !== undefined && !isNaN(updatedData.numberOfFish)) formData.append("NumberOfFish", updatedData.numberOfFish);
    if (updatedData.imageUrl && updatedData.imageUrl.trim() !== "") formData.append("ImageURL", updatedData.imageUrl);
    if (updatedData.status && ["Available", "Sold", "Pending"].includes(updatedData.status)) formData.append("Status", updatedData.status);

    // Thêm file ảnh vào formData nếu có
    if (updatedData.imageFiles && updatedData.imageFiles.length > 0) {
      updatedData.imageFiles.forEach((file) => {
        formData.append("ImageFile", file.originFileObj);
      });
    }

    const response = await axios.put(`/api/FishPackage/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating fish package:", error.response?.data || error);
    if (error.response?.data?.errors) {
      console.error("Validation Errors:", error.response.data.errors);
    }
    throw error;
  }
};





export const createFishPackage = async (newData) => {
  try {
    const formData = new FormData();
    
    // Append từng field vào formData (chấp nhận giá trị rỗng)
    formData.append("Name", newData.name || "");
    formData.append("Age", newData.age !== undefined ? newData.age : "");
    formData.append("Gender", newData.gender || "");
    formData.append("Size", newData.size !== undefined ? newData.size : "");
    formData.append("Description", newData.description || "");
    formData.append("TotalPrice", newData.totalPrice !== undefined ? newData.totalPrice : "");
    formData.append("DailyFood", newData.dailyFood !== undefined ? newData.dailyFood : "");
    formData.append("NumberOfFish", newData.numberOfFish !== undefined ? newData.numberOfFish : "");
    formData.append("ImageURL", newData.imageUrl || "");

    // Thêm file ảnh vào formData nếu có
    if (newData.imageFiles && newData.imageFiles.length > 0) {
      newData.imageFiles.forEach((file) => {
        formData.append("ImageFile", file.originFileObj);
      });
    } else {
      formData.append("ImageFile", ""); // Thêm trường ImageFile rỗng nếu không có file
    }

    const response = await axios.post('/api/FishPackage', formData, {
      headers: { "Content-Type": "multipart/form-data" },
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