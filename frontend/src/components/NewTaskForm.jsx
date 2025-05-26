import React, { useState } from 'react';
import { TextField, Button, MenuItem, Card, CardContent, Typography, Alert } from '@mui/material';
import axios from 'axios';

const NewTaskForm = ({ onTaskAdded }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('To Do');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskStatus('To Do');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!taskTitle.trim()) {
      setError('Task title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fixed port to match your backend (8080 instead of 8082)
      const response = await axios.post('http://localhost:8080/api/v1/save', {
        taskTitle: taskTitle.trim(),
        taskDescription: taskDescription.trim(),
        taskStatus,
        taskCreatedDate: new Date().toISOString().split('T')[0],
        taskDueDate: new Date().toISOString().split('T')[0],
        userId: 'defaultUser', // This should come from authentication context
        taskCategory: 'General'
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers here if needed
          // 'Authorization': `Bearer ${token}`
        }
      });

      // Call the parent component's callback with the new task
      onTaskAdded(response.data);
      
      // Reset the form
      resetForm();
      
      console.log('Task added successfully:', response.data);
    } catch (error) {
      console.error('Error adding task:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          setError('Unauthorized: Please log in again');
        } else if (error.response.status === 403) {
          setError('Forbidden: You do not have permission to add tasks');
        } else {
          setError(`Error: ${error.response.data || 'Failed to add task'}`);
        }
      } else if (error.request) {
        // Network error
        setError('Network error: Please check your connection');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <CardContent>
        <Typography variant="h6">Add New Task</Typography>
        
        {error && (
          <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            margin="normal"
            required
            error={!taskTitle.trim() && error}
            helperText={!taskTitle.trim() && error ? 'Title is required' : ''}
          />
          <TextField
            fullWidth
            label="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            select
            fullWidth
            label="Status"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ mt: 2 }} 
            disabled={loading}
          >
            {loading ? 'Adding Task...' : 'Add Task'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewTaskForm;