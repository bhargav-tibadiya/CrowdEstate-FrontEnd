import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const login = async (payload) => {
  try {

    const response = await axios.post(`${API_URL}/login`, payload);
    return response.data;

  } catch (error) {

    console.log('Error While Login\n Check authAPi #FE001', error);
    throw error;

  }
}