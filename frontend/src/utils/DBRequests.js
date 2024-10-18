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
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please log in.');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_BASE_URL}/events`, config); 
    return response.data.events;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error fetching events');
  }
};

export const fetchUserEvents = async (userId) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please log in.');
    }

    const response = await axios.get(`${API_BASE_URL}/events?createdBy=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error fetching user events');
  }
};
export const editEvent = async (eventId, eventData) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please log in.');
    }

    const response = await axios.patch(`${API_BASE_URL}/events/${eventId}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error editing event');
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please log in.');
    }

    const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error deleting event');
  }
};

