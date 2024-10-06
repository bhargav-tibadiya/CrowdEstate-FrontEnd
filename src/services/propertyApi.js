import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_BASE_URL;


export const addPropertyAPI = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/property/addproperty`, payload, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {

    console.log('Error While Adding Property \n Check propertyAPI #FE006', error);
    console.log('Reason:', error?.response?.data?.message);
    throw error.response?.data || error;

  }
};