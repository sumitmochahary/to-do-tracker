import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "Login failed";
  }
};

export const registerUser = async (registerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, registerData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
};
