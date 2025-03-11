import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://10.91.67.103:8080/api/';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}login/`, {
      username: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}signup/`,{
      username: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Signup Error:', error);
    throw error;
  }
}

export const fetchUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    
    if (token) {
      const response = await fetch(`${BASE_URL}user_info/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.username; // Return username from the 'user' object
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
    // Optionally, make an API call to invalidate the token on the server
    const token = await AsyncStorage.getItem('authToken');
    
    if (token) {
      // You can call an endpoint like `/logout/` or `/invalidate_token/` to invalidate the token on the server side
      await axios.post(`${BASE_URL}logout/`, {}, {
        headers: { Authorization: `Token ${token}` }
      });

      // Clear the token and any other session data from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('username');

      console.log("User logged out successfully.");
    } else {
      console.log("No token found for logout.");
    }
  } catch (error) {
    console.error("Logout Error:", error);
  }
};