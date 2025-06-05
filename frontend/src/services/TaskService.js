import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

// ✅ ENHANCED: Better token management
const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No authentication token found");
  }
  return token;
};

// Headers with better error handling
const getHeaders = () => {
  const token = getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

const getJsonHeaders = () => {
  const token = getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// ✅ ENHANCED: Better error handling utility
const handleApiError = (error, operation) => {
  console.error(`Error ${operation}:`, error);
  
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    console.error(`HTTP ${status}:`, data);
    
    switch (status) {
      case 400:
        throw new Error(`Bad request: ${data.message || 'Invalid data provided'}`);
      case 401:
        throw new Error('Authentication failed. Please login again.');
      case 403:
        throw new Error('Permission denied. You cannot perform this action.');
      case 404:
        throw new Error('Resource not found.');
      case 409:
        throw new Error(`Conflict: ${data.message || 'Resource conflict occurred'}`);
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(`Request failed: ${data.message || 'Unknown error'}`);
    }
  } else if (error.request) {
    // Network error
    throw new Error('Network error. Please check your connection.');
  } else {
    // Other error
    throw new Error(`Request setup error: ${error.message}`);
  }
};

// ========== GET OPERATIONS ==========

// Fetch all tasks
export const fetchTask = async () => {
  try {
    console.log("Fetching all tasks...");
    const response = await axios.get(`${BASE_URL}/fetch`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    console.log("✅ Tasks fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "fetching tasks");
  }
};

// Fetch by category
export const fetchByCategory = async (category) => {
  try {
    console.log(`Fetching tasks by category: ${category}`);
    const response = await axios.get(`${BASE_URL}/category/${category}`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    console.log("✅ Tasks by category fetched:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, `fetching tasks by category ${category}`);
  }
};

// Fetch by status
export const fetchByStatus = async (status) => {
  try {
    console.log(`Fetching tasks by status: ${status}`);
    const response = await axios.get(`${BASE_URL}/status/${status}`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    console.log("✅ Tasks by status fetched:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, `fetching tasks by status ${status}`);
  }
};

// Fetch by due date
export const fetchByDueDate = async (dueDate) => {
  try {
    console.log(`Fetching tasks by due date: ${dueDate}`);
    const response = await axios.get(`${BASE_URL}/due/${dueDate}`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    console.log("✅ Tasks by due date fetched:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, `fetching tasks by due date ${dueDate}`);
  }
};

// ✅ FIXED: Multiple approaches to fetch archived tasks
export const fetchArchivedTasks = async () => {
  try {
    console.log("Fetching archived tasks...");
    
    // Try different endpoints/approaches
    let response;
    
    // Approach 1: Try with "Archived" (capitalized)
    try {
      response = await axios.get(`${BASE_URL}/status/Archived`, {
        headers: getHeaders(),
        withCredentials: true,
      });
      console.log("✅ Archived tasks fetched (capitalized):", response.data);
      return response.data;
    } catch (error) {
      console.log("Capitalized 'Archived' endpoint failed, trying lowercase...");
    }
    
    // Approach 2: Try with "archived" (lowercase) - original approach
    try {
      response = await axios.get(`${BASE_URL}/status/archived`, {
        headers: getHeaders(),
        withCredentials: true,
      });
      console.log("✅ Archived tasks fetched (lowercase):", response.data);
      return response.data;
    } catch (error) {
      console.log("Lowercase 'archived' endpoint failed, trying dedicated endpoint...");
    }
    
    // Approach 3: Try dedicated archived endpoint
    try {
      response = await axios.get(`${BASE_URL}/archived`, {
        headers: getHeaders(),
        withCredentials: true,
      });
      console.log("✅ Archived tasks fetched (dedicated endpoint):", response.data);
      return response.data;
    } catch (error) {
      console.log("Dedicated archived endpoint failed");
    }
    
    // If all approaches fail, throw error
    throw new Error("Unable to fetch archived tasks from any endpoint");
    
  } catch (error) {
    handleApiError(error, "fetching archived tasks");
  }
};

// ✅ NEW: Alternative method - fetch all tasks and filter archived ones client-side
export const fetchArchivedTasksClientFilter = async () => {
  try {
    console.log("Fetching all tasks and filtering archived ones...");
    const allTasks = await fetchTask();
    
    // Filter tasks that have "Archived" or "archived" status
    const archivedTasks = allTasks.filter(task => 
      task.taskStatus && 
      (task.taskStatus.toLowerCase() === 'archived' || task.taskStatus === 'Archived')
    );
    
    console.log("✅ Archived tasks filtered:", archivedTasks);
    return { data: archivedTasks };
  } catch (error) {
    handleApiError(error, "fetching and filtering archived tasks");
  }
};

// ========== POST OPERATIONS ==========

// ✅ ENHANCED: Save new task with better logging
export const saveTask = async (data) => {
  try {
    console.log("Saving new task:", data);
    
    // Validate required fields
    if (!data.taskTitle || !data.taskTitle.trim()) {
      throw new Error("Task title is required");
    }
    
    const response = await axios.post(`${BASE_URL}/save`, data, {
      headers: getJsonHeaders(),
      withCredentials: true,
    });
    
    console.log("✅ Task saved successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "saving task");
  }
};

// ========== PUT OPERATIONS ==========

// ✅ ENHANCED: Update existing task with validation
export const updateTask = async (data) => {
  try {
    console.log("Updating task:", data);
    
    // Validate task ID
    if (!data.taskId) {
      throw new Error("Task ID is required for update");
    }
    
    // Validate required fields
    if (!data.taskTitle || !data.taskTitle.trim()) {
      throw new Error("Task title is required");
    }
    
    const response = await axios.put(`${BASE_URL}/update`, data, {
      headers: getJsonHeaders(),
      withCredentials: true,
    });
    
    console.log("✅ Task updated successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, `updating task ${data.taskId}`);
  }
};

// ✅ ENHANCED: Archive task with validation and debugging
export const archiveTask = async (taskId) => {
  try {
    console.log(`Archiving task: ${taskId}`);
    
    if (!taskId) {
      throw new Error("Task ID is required for archiving");
    }
    
    const response = await axios.put(
      `${BASE_URL}/archive/${taskId}`,
      {},
      {
        headers: getHeaders(),
        withCredentials: true,
      }
    );
    
    console.log("✅ Task archived successfully:", response.data);
    console.log("✅ Task status after archiving:", response.data.taskStatus);
    return response.data;
  } catch (error) {
    handleApiError(error, `archiving task ${taskId}`);
  }
};

// ✅ NEW: Restore task from archive
export const restoreTask = async (taskId) => {
  try {
    console.log(`Restoring task: ${taskId}`);
    
    if (!taskId) {
      throw new Error("Task ID is required for restoration");
    }
    
    const response = await axios.put(
      `${BASE_URL}/restore/${taskId}`,
      {},
      {
        headers: getHeaders(),
        withCredentials: true,
      }
    );
    
    console.log("✅ Task restored successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, `restoring task ${taskId}`);
  }
};

// ========== DELETE OPERATIONS ==========

// ✅ ENHANCED: Delete task with validation
export const deleteTask = async (taskId) => {
  try {
    console.log(`Deleting task: ${taskId}`);
    
    if (!taskId) {
      throw new Error("Task ID is required for deletion");
    }
    
    const response = await axios.delete(`${BASE_URL}/delete/${taskId}`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    
    console.log("✅ Task deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, `deleting task ${taskId}`);
  }
};

// ✅ NEW: Permanently delete archived task
export const permanentDeleteTask = async (taskId) => {
  try {
    console.log(`Permanently deleting task: ${taskId}`);
    
    if (!taskId) {
      throw new Error("Task ID is required for permanent deletion");
    }
    
    const response = await axios.delete(`${BASE_URL}/permanent/${taskId}`, {
      headers: getHeaders(),
      withCredentials: true,
    });
    
    console.log("✅ Task permanently deleted:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, `permanently deleting task ${taskId}`);
  }
};

// ✅ NEW: Utility function to validate task data
export const validateTaskData = (taskData) => {
  const errors = [];
  
  if (!taskData.taskTitle || !taskData.taskTitle.trim()) {
    errors.push("Task title is required");
  }
  
  if (taskData.taskTitle && taskData.taskTitle.length > 255) {
    errors.push("Task title must be less than 255 characters");
  }
  
  if (taskData.taskDescription && taskData.taskDescription.length > 1000) {
    errors.push("Task description must be less than 1000 characters");
  }
  
  if (taskData.taskDueDate) {
    const dueDate = new Date(taskData.taskDueDate);
    if (isNaN(dueDate.getTime())) {
      errors.push("Invalid due date format");
    }
  }
  
  return errors;
};