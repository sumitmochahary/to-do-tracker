import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

export const fetchTask = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BASE_URL}/fetch`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
