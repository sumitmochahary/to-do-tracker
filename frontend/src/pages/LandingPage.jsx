import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Collapse, Fab, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Add as AddIcon, Close as CloseIcon, ViewColumn as ColumnIcon } from "@mui/icons-material";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Column from "../components/Column";
import NewTaskForm from "../components/NewTaskForm";
import columnService from '../services/columnServices';
import axios from "axios";

const LandingPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [columns, setColumns] = useState(['To Do', 'In Progress', 'Completed']);
const [loading, setLoading] = useState(false);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const userId = 'defaultUser';
      const response = await axios.get(`http://localhost:3000/card`);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
  loadColumns();
}, []);

const loadColumns = async () => {
  try {
    setLoading(true);
    const columnsData = await columnService.getColumns();
    setColumns(columnsData.map(col => col.title));
  } catch (error) {
    console.error('Failed to load columns:', error);
    // Keep default columns on error
  } finally {
    setLoading(false);
  }
};

  // Add new task to state and refresh from server
  const handleTaskAdded = async (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowTaskForm(false); // Close form after adding task
  };

  // Add new column
 const handleAddColumn = async () => {
  if (!newColumnTitle.trim()) return;
  
  try {
    await columnService.addColumn(newColumnTitle.trim());
    await loadColumns(); // Reload from JSON
    setNewColumnTitle('');
    setShowColumnDialog(false);
  } catch (error) {
    alert('Error: ' + error.message);
  }
};

  // Remove column (only custom columns, not default ones)
  const handleRemoveColumn = async (columnTitle) => {
  try {
    await columnService.removeColumn(columnTitle);
    await loadColumns(); // Reload from JSON
  } catch (error) {
    alert('Error: ' + error.message);
  }
};

  // Filter tasks by status
  const getTasksByStatus = (status) => tasks.filter((task) => task.taskStatus === status);

  return (
    <Box display="flex" sx={{ backgroundColor: '#f8faff', minHeight: '100vh' }}>
      <SideBar />
      <Box flexGrow={1}>
        <Header />
        <Box p={3}>
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            p: 3,
            mb: 3,
            color: 'white',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
          }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              🎯 Welcome to Your To-Do Board
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Stay organized and boost your productivity!
            </Typography>
          </Box>

          {/* Toggle Button for Task Form */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => setShowTaskForm(!showTaskForm)}
              startIcon={showTaskForm ? <CloseIcon /> : <AddIcon />}
              sx={{
                background: showTaskForm 
                  ? 'linear-gradient(45deg, #ff6b6b 30%, #ee5a24 90%)'
                  : 'linear-gradient(45deg, #4834d4 30%, #686de0 90%)',
                borderRadius: 3,
                padding: '12px 30px',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: showTaskForm 
                  ? '0 4px 15px rgba(255, 107, 107, 0.4)'
                  : '0 4px 15px rgba(72, 52, 212, 0.4)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: showTaskForm 
                    ? '0 6px 20px rgba(255, 107, 107, 0.6)'
                    : '0 6px 20px rgba(72, 52, 212, 0.6)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              {showTaskForm ? ' Close Form' : ' Add New Task'}
            </Button>
          </Box>

          {/* Collapsible Task Form */}
          <Collapse in={showTaskForm}>
            <NewTaskForm onTaskAdded={handleTaskAdded} availableStatuses={columns} />
          </Collapse>

          {/* Task Columns */}
          <Grid container spacing={3} mt={1}>
            {columns.map((status, index) => (
              <Grid item xs={12} md={4} lg={3} key={status}>
                <Column 
                  title={status} 
                  tasks={getTasksByStatus(status)} 
                  onRemoveColumn={handleRemoveColumn}
                  isRemovable={!["To Do", "In Progress", "Completed"].includes(status)}
                  columnIndex={index}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Floating Action Button - Alternative toggle option */}
      {/* Floating Action Button - Add New Column */}
      <Fab
        color="primary"
        aria-label="add column"
        onClick={() => setShowColumnDialog(true)}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(45deg, #00c9ff 30%, #92fe9d 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00b9ef 30%, #82ee8d 90%)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px rgba(0, 201, 255, 0.4)',
        }}
      >
        <AddIcon />
      </Fab>
      {/* Add Column Dialog */}
      <Dialog 
        open={showColumnDialog} 
        onClose={() => setShowColumnDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #00c9ff 30%, #92fe9d 90%)',
          color: 'white',
          fontWeight: 'bold'
        }}>
          🏗️ Add New Column
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Column Title"
            fullWidth
            variant="outlined"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
            helperText="Enter a unique name for your new column"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={() => setShowColumnDialog(false)}
            sx={{
              borderRadius: 2,
              padding: '8px 20px',
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddColumn}
            variant="contained"
            disabled={!newColumnTitle.trim() || columns.includes(newColumnTitle.trim())}
            sx={{
              background: 'linear-gradient(45deg, #00c9ff 30%, #92fe9d 90%)',
              borderRadius: 2,
              padding: '8px 20px',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(45deg, #00b9ef 30%, #82ee8d 90%)',
              }
            }}
          >
            Add Column
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandingPage;