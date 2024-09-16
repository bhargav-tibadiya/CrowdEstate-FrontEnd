import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const loginAPI = async (payload) => {
  try {

    const response = await axios.post(`${API_URL}/auth/login`, payload, {
      withCredentials: true
    });
    return response.data;

  } catch (error) {

    console.log('Error While Login\n Check authAPi #FE001', error);
    console.log('Reason :', error?.response?.data?.message)
    return error.response.data

  }
}

export const otpAPI = async (payload) => {
  try {

    const response = await axios.post(`${API_URL}/auth/otp`, payload, {
      withCredentials: true
    });
    return response.data;

  } catch (error) {

    console.log('Error While Login\n Check authAPi #FE003', error);
    console.log('Reason :', error?.response?.data?.message)
    return error.response.data

  }
}


export const signupAPI = async (payload) => {
  try {

    const response = await axios.post(`${API_URL}/auth/signup`, payload, {
      withCredentials: true
    });
    return response.data;

  } catch (error) {

    console.log('Error While Login\n Check authAPi #FE004', error);
    console.log('Reason :', error?.response?.data?.message)
    return error.response.data

  }
}