import axios from "axios";

const BASE_URL = "http://localhost:8080/api/password";

export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot`, data);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to send password reset email."
    );
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Error resetting password"
    );
  }
};
