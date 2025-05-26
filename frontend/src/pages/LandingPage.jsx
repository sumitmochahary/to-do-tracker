import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Column from "../components/Column";
import NewTaskForm from "../components/NewTaskForm";
import axios from "axios";

const LandingPage = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Updated to match your backend endpoint structure
      // You'll need to provide a userId - this should come from authentication
      const userId = 'defaultUser'; // Replace with actual authenticated user ID
      const response = await axios.get(`http://localhost:8080/api/v1/fetch/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      // Handle error appropriately - maybe show a notification
    }
  };

  // Add new task to state and refresh from server
  const handleTaskAdded = async (newTask) => {
    // Add the new task to local state immediately for better UX
    setTasks((prev) => [...prev, newTask]);
    
    // Optionally refresh from server to ensure data consistency
    // await fetchTasks();
  };

  // Filter tasks by status
  const getTasksByStatus = (status) => tasks.filter((task) => task.taskStatus === status);

  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <Header />
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            Welcome to Your To-Do Board
          </Typography>
          <NewTaskForm onTaskAdded={handleTaskAdded} />
          <Grid container spacing={2} mt={2}>
            {["To Do", "In Progress", "Completed"].map((status) => (
              <Grid item xs={12} md={4} key={status}>
                <Column title={status} tasks={getTasksByStatus(status)} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;