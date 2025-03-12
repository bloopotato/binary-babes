import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://192.168.1.103:8080/'; 

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}login/`, {
      username: username,
      password: password,
    });
    await AsyncStorage.setItem('accessToken', response.data.access);
    await AsyncStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const signupUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}register/`, {
      username: username,
      email: email,
      password: password,
    });
    await AsyncStorage.setItem('accessToken', response.data.access);
    await AsyncStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
  } catch (error) {
    console.error('Signup Error:', error);
    throw error;
  }
};

export const fetchUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    
    if (token) {
      const response = await fetch(`${BASE_URL}dashboard/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data; // Return the welcome message
      } else {
        console.error('Error fetching user info:', response.statusText);
      }
    } else {
      console.log('No token found');
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const createChatSession = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${BASE_URL}chatbot/create_chat_session/`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating chat session:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getChatSessions = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      const response = await axios.get(`${BASE_URL}chatbot/get_chat_session/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } else {
      console.log('No token found');
    }
  } catch (error) {
    console.error('Error fetching chat sessions:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getChatMessages = async (sessionId) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${BASE_URL}chatbot/get_chat_message/${sessionId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat messages:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createChatMessage = async (sessionId, sender, message) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${BASE_URL}chatbot/create_chat_message/${sessionId}/`, {
      sender: sender,
      message: message,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating chat message:', error.response ? error.response.data : error.message);
    throw error;
  }
};