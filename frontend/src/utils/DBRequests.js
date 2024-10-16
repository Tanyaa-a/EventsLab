import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
        throw new Error(error.response.data.error);
  }
};

export const logout = async () => {
  return await axios.post(`${API_BASE_URL}/logout`, {});
};

export const register = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`, userData);
      return response;
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.error);
    }
};
  

export const addEvent = async (eventData) => {
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.post(`${API_BASE_URL}/events`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    
    return response;
  } catch (error) {
   
    throw new Error(error.response.data.error);
  }
};


export const fetchEvents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events`); 
        return response.data.events;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
};

export const fetchUserEvents = async (userId) => {
  try {
    const response = await axios.get(`/events?createdBy=${userId}`);
  return response;
  }
  catch (error) {
    throw new Error(error.response.data.error);
  }
  
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`/events/${eventId}`);
    return response;
  }
  catch (error) {
    throw new Error(error.response.data.error);
  }
};

