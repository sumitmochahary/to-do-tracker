import React, { useState } from 'react';
import { TextField, Button, MenuItem, Card, CardContent, Typography, Alert } from '@mui/material';
import axios from 'axios';

const NewTaskForm = ({ onTaskAdded, availableStatuses = ["To Do", "In Progress", "Completed"] }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('To Do');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskStatus(availableStatuses[0] || 'To Do'); // Set to first available status
    setTaskDueDate('');
    setError('');
  };

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!taskTitle.trim()) {
      setError('Task title is required');
      return;
    }

    if (!taskDueDate) {
      setError('Due date is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/card', {
        taskTitle: taskTitle.trim(),
        taskDescription: taskDescription.trim(),
        taskStatus,
        taskCreatedDate: new Date().toISOString().split('T')[0],
        taskDueDate: taskDueDate,
        userId: 'defaultUser',
        taskCategory: 'General'
      }, {
        headers: {
          'Content-Type': 'application/json',
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
        if (error.response.status === 401) {
          setError('Unauthorized: Please log in again');
        } else if (error.response.status === 403) {
          setError('Forbidden: You do not have permission to add tasks');
        } else {
          setError(`Error: ${error.response.data || 'Failed to add task'}`);
        }
      } else if (error.request) {
        setError('Network error: Please check your connection');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      sx={{ 
        p: 2, 
        mt: 2, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
        borderRadius: 3
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          ✨ Add New Task
        </Typography>
        
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
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
              }
            }}
          />
          <TextField
            fullWidth
            label="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
              }
            }}
          />
          <TextField
            select
            fullWidth
            label="Status"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
              }
            }}
          >
            {availableStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status === 'To Do' ? '📋' : 
                 status === 'In Progress' ? '⚡' : 
                 status === 'Completed' ? '✅' : '🔖'} {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: getTodayDate()
            }}
            error={!taskDueDate && error}
            helperText={!taskDueDate && error ? 'Due date is required' : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
              }
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              mt: 2,
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              borderRadius: 3,
              padding: '12px 30px',
              fontWeight: 'bold',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FE8B8B 30%, #FFAE53 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .3)',
              },
              transition: 'all 0.3s ease'
            }} 
            disabled={loading}
          >
            {loading ? '⏳ Adding Task...' : '🚀 Add Task'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewTaskForm;

// const response = await axios.post('http://localhost:8080/api/v1/save', {