import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

// Common Headers
const getHeaders = (isJson = false) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  if (isJson) headers["Content-Type"] = "application/json";
  return headers;
};

// Generic request handler
const request = async (method, endpoint, data = null, isJson = false) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: getHeaders(isJson),
      withCredentials: true,
    };
    if (data) config.data = data;

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error during ${method.toUpperCase()} ${endpoint}:`, error);
    throw error;
  }
};

// ========== GET ==========

export const fetchTask = () => request("get", "/fetch");
export const fetchByCategory = (category) =>
  request("get", `/category/${category}`);
export const fetchByStatus = (status) => request("get", `/status/${status}`);
export const fetchByDueDate = (dueDate) => request("get", `/due/${dueDate}`);
export const fetchArchivedTasks = () => request("get", "/status/archived");

// ========== POST ==========

export const saveTask = (data) => request("post", "/save", data, true);

// ========== PATCH ==========

export const updateTask = (data) =>
  request("patch", `/update/${data.taskId}`, data, true);
export const archiveTask = (taskId) =>
  request("patch", `/archive/${taskId}`, {}, false);

// ========== DELETE ==========

export const deleteTask = (taskId) => request("delete", `/delete/${taskId}`);
