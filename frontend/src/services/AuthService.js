import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    let message = "Login failed. Please try again.";

    if (error.message === "Network Error") {
      message =
        "Unable to connect to the server. Please check your internet or server.";
    } else if (error.response) {
      const data = error.response.data;

      if (typeof data === "string") {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (data?.error) {
        message = data.error;
      } else {
        message = `Login failed with status ${error.response.status}`;
      }
    } else if (typeof error.message === "string") {
      message = error.message;
    }

    throw new Error(message);
  }
};

export const registerUser = async (registerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, registerData);
    return response.data || "Registration successful!";
  } catch (error) {
    let message = "Registration failed. Please try again.";

    if (error.message === "Network Error") {
      message =
        "Unable to connect to the server. Please check your internet or server.";
    } else if (error.response) {
      const data = error.response.data;

      if (typeof data === "string") {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (data?.error) {
        message = data.error;
      } else {
        message = `Request failed with status ${error.response.status}`;
      }
    } else if (typeof error.message === "string") {
      message = error.message;
    }

    // Throw a new error with a custom message
    throw new Error(message);
  }
};
