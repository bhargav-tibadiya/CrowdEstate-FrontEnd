import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const imageUploadAPI = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload/imageUpload`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.log('Error While Uploading Image\n Check uploadAPI #FE005', error);
    console.log('Reason:', error?.response?.data?.message);
    throw error.response?.data || error;
  }
};