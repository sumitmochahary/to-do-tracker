import axios from "axios";

const BASE_URL = "http://localhost:8080/api/password";

export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot`, data);
    return response.data;
  } catch (error) {
    let message = "Failed to send password reset email.";

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

    throw new Error(message);
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
    let message = "Error resetting password.";

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

    throw new Error(message);
  }
};
