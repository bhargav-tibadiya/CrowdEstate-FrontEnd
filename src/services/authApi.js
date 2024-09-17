import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const loginAPI = async (payload) => {
  try {

    const response = await axios.post(`${API_URL}/auth/login`, payload, {
      withCredentials: true
    });

    const cookieConfig = {
      path: '/',
      expires: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
    }

    if (response.data.token) {
      Cookies.set('token', response.data.token, cookieConfig);
    }

    return response.data;

  } catch (error) {

    console.log('Error While Login\n Check authAPi #FE001', error);
    console.log('Reason :', error?.response?.data?.message)
    return error.response.data

  }
}

export const otpAPI = async (payload) => {
  try {

    const response = await axios.post(`${API_URL}/auth/sendotp`, payload, {
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