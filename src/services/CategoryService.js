import axios from '../api/axios';

export const getCategories = async (page, pageSize) => {
  try {
    const response = await axios.get(`/api/Category`, {
      params: { page, pageSize },
    });
    return response.data.data.listData; // Trả về listData
  } catch (error) {
    console.error('Failed to fetch categories', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  const formData = new FormData();
  formData.append('Name', categoryData.name);
  formData.append('Description', categoryData.description);
  formData.append('OriginCountry', categoryData.originCountry);

  if (categoryData.imageUrl) {
    formData.append('ImageUrl', categoryData.imageUrl, categoryData.imageUrl.name);
  }

  try {
    const response = await axios.post(`/api/Category`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000,
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      throw new Error(Object.values(error.response.data.errors).flat().join(', '));
    }
    throw new Error(error.message || 'Failed to create category');
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const formData = new FormData();
    formData.append('Name', categoryData.name);
    formData.append('Description', categoryData.description);
    formData.append('OriginCountry', categoryData.originCountry);

    // // Attach the image file if it exists
    // if (categoryData.imageUrl) {
    //   formData.append('ImageUrl', categoryData.imageUrl, categoryData.imageUrl.name);
    // }
    // Check if imageUrl is a File or Blob, otherwise handle it as a URL
    if (categoryData.imageUrl instanceof File || categoryData.imageUrl instanceof Blob) {
      formData.append('ImageUrl', categoryData.imageUrl, categoryData.imageUrl.name);
    } else if (typeof categoryData.imageUrl === 'string') {
      // Append URL as a simple string if it exists and is not a Blob or File
      formData.append('ImageUrlUrl', categoryData.imageUrl);  // Add a field for URL string (modify API if needed)
    }

    const response = await axios.put(`/api/Category/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, 
    });

    return response.data; 
  } catch (error) {
    if (error.response?.data?.errors) {
      throw new Error(Object.values(error.response.data.errors).flat().join(', '));
    }
    throw new Error(error.message || 'Failed to update category');
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`/api/Category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete category', error);
    throw error;
  }
};