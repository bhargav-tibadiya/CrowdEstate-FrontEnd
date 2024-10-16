import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const buyPropertyAPI = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/purchase/buy`, payload, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {

    console.log('Error While Adding Property \n Check PurchaseAPI #FE013', error);
    console.log('Reason:', error?.response?.data?.message);
    throw error.response?.data || error;

  }
};

export const addTransaction = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/purchase/addtransaction`, payload, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {

    console.log('Error While Adding Transaction \n Check PurchaseAPI #FE014', error);
    console.log('Reason:', error?.response?.data?.message);
    throw error.response?.data || error;

  }
};

export const fetchAllTransaction = async (payload) => {
  try {
    
    const response = await axios.post(`${API_URL}/purchase/alltransaction`, payload, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {

    console.log('Error While Adding Transaction \n Check PurchaseAPI #FE016', error);
    console.log('Reason:', error?.response?.data?.message);
    throw error.response?.data || error;

  }
};