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

export const showAllPropertiesOfUser = async (payload) => {
  try {

    const response = await axios.post(`${API_URL}/property/showproperties`, payload, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {

    console.log('Error While Adding Property \n Check propertyAPI #FE008', error);
    console.log('Reason:', error?.response?.data?.message);
    throw error.response?.data || error;

  }
};

export const fetchAllProperties = async () => {
  try {

    const response = await axios.post(`${API_URL}/property/fetchallproperties`, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {

    console.log('Error While Fetching All Property \n Check propertyAPI #FE008=9', error);
    console.log('Reason:', error?.response?.data?.message);
    throw error.response?.data || error;

  }
};

export const getProperty = async (id) => {
  try {

    const payload = {
      id: id
    }

    const response = await axios.post(`${API_URL}/property/getproperty`, payload, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {

    console.log('Error While Fetching All Property \n Check propertyAPI #FE0011', error);
    console.log('Reason:', error?.response?.data?.message);
    throw error.response?.data || error;

  }
};

export const changeOwner = async (propertyId, newOwnerId) => {
  try {
    const payload = {
      propertyId: propertyId,
      newOwnerId: newOwnerId,
    };

    const response = await axios.post(`${API_URL}/property/changeowner`, payload, {
      withCredentials: true,
    });

    return response.data;

  } catch (error) {
    console.log('Error While Changing Property Owner \n Check propertyAPI #FE0015', error);
    console.log('Reason:', error?.response?.data?.message);
    throw error.response?.data || error;
  }
};