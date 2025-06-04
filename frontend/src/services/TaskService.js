import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

// Headers
const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const jsonHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// ========== GET ==========

// Fetch all tasks
export const fetchTask = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/fetch`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Fetch by category
export const fetchByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${category}`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks by category:", error);
    throw error;
  }
};

// Fetch by status
export const fetchByStatus = async (status) => {
  try {
    const response = await axios.get(`${BASE_URL}/status/${status}`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks by status:", error);
    throw error;
  }
};

// Fetch by due date (yyyy-mm-dd)
export const fetchByDueDate = async (dueDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/due/${dueDate}`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks by due date:", error);
    throw error;
  }
};

// Fetch archived tasks
export const fetchArchivedTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/status/archived`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching archived tasks:", error);
    throw error;
  }
};

// ========== POST ==========

// Save new task
export const saveTask = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/save`, data, {
      headers: jsonHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving task:", error);
    throw error;
  }
};

// ========== PUT ==========

// Update existing task
export const updateTask = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/update`, data, {
      headers: jsonHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Archive task
export const archiveTask = async (taskId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/archive/${taskId}`,
      {},
      {
        headers: getHeaders(),
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error archiving task:", error);
    throw error;
  }
};

// ========== DELETE ==========

// Delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${taskId}`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
