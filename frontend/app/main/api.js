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

export const logoutUser = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    
    if (token) {
      await axios.post(`${BASE_URL}logout/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await AsyncStorage.removeItem('accessToken');   // Clear token and session data
      await AsyncStorage.removeItem('refreshToken');

      console.log("User logged out successfully.");
    } else {
      console.log("No token found for logout.");
    }
  } catch (error) {
    console.error("Logout Error:", error);
  }
};