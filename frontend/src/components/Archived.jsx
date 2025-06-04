import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Chip, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Box,
  IconButton,
  Tooltip,
  Fade,
  Paper
} from '@mui/material';
import { 
  Restore as RestoreIcon, 
  Delete as DeleteIcon, 
  Visibility as VisibilityIcon,
  Archive as ArchiveIcon 
} from '@mui/icons-material';
import axios from 'axios';

const Archived = () => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch archived tasks on component mount
  useEffect(() => {
    fetchArchivedTasks();
  }, []);

  const fetchArchivedTasks = async () => {
    try {
      setLoading(true);
      setError('');
      // Assuming your API has an endpoint for archived tasks
      const response = await axios.get('http://localhost:3000/cards/archived');
      setArchivedTasks(response.data);
    } catch (error) {
      console.error('Error fetching archived tasks:', error);
      setError('Failed to load archived tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Restore task from archive
  const handleRestoreTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:3000/card/${taskId}/restore`);
      
      // Remove from archived tasks list
      setArchivedTasks(prev => prev.filter(task => task.id !== taskId));
      setSuccessMessage('Task restored successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error restoring task:', error);
      setError('Failed to restore task. Please try again.');
    }
  };

  // Permanently delete task
  const handlePermanentDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/card/${taskId}/permanent`);
      
      // Remove from archived tasks list
      setArchivedTasks(prev => prev.filter(task => task.id !== taskId));
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
      setSuccessMessage('Task permanently deleted!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting task permanently:', error);
      setError('Failed to delete task permanently. Please try again.');
      setDeleteDialogOpen(false);
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  // Open view task dialog
  const openViewDialog = (task) => {
    setSelectedTask(task);
    setViewDialogOpen(true);
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'To Do':
        return { color: '#ff9800', icon: '📋' };
      case 'In Progress':
        return { color: '#2196f3', icon: '⚡' };
      case 'Completed':
        return { color: '#4caf50', icon: '✅' };
      default:
        return { color: '#757575', icon: '🔖' };
    }
  };

  // Calculate days since archived
  const getDaysArchived = (archivedDate) => {
    const archived = new Date(archivedDate);
    const now = new Date();
    const diffTime = Math.abs(now - archived);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Loading archived tasks...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper 
        elevation={3}
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 3
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <ArchiveIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              📦 Archived Tasks
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              {archivedTasks.length} archived task{archivedTasks.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Success/Error Messages */}
      {successMessage && (
        <Fade in={Boolean(successMessage)}>
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        </Fade>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Archived Tasks Grid */}
      {archivedTasks.length === 0 ? (
        <Paper 
          elevation={1} 
          sx={{ 
            p: 6, 
            textAlign: 'center', 
            background: 'linear-gradient(45deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: 3
          }}
        >
          <ArchiveIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
            No Archived Tasks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            When you archive tasks, they'll appear here for easy access and restoration.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {archivedTasks.map((task) => {
            const statusInfo = getStatusInfo(task.taskStatus);
            const daysArchived = getDaysArchived(task.archivedDate);
            
            return (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      border: '2px solid #667eea'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Status and Archive Info */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Chip
                        icon={<span>{statusInfo.icon}</span>}
                        label={task.taskStatus}
                        sx={{
                          backgroundColor: statusInfo.color,
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                      <Chip
                        label={`${daysArchived} day${daysArchived !== 1 ? 's' : ''} ago`}
                        size="small"
                        sx={{ 
                          backgroundColor: '#f5f5f5',
                          color: 'text.secondary'
                        }}
                      />
                    </Box>

                    {/* Task Title */}
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 'bold',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {task.taskTitle}
                    </Typography>

                    {/* Task Description Preview */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {task.taskDescription || 'No description provided'}
                    </Typography>

                    {/* Dates */}
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Due:</strong> {new Date(task.taskDueDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Archived:</strong> {new Date(task.archivedDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>

                  {/* Action Buttons */}
                  <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                    <Box>
                      <Tooltip title="View Details">
                        <IconButton 
                          onClick={() => openViewDialog(task)}
                          color="primary"
                          size="small"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    <Box>
                      <Tooltip title="Restore Task">
                        <IconButton 
                          onClick={() => handleRestoreTask(task.id)}
                          color="success"
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          <RestoreIcon />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Delete Permanently">
                        <IconButton 
                          onClick={() => openDeleteDialog(task)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* View Task Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm" 
        fullWidth
      >
        {selectedTask && (
          <>
            <DialogTitle sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: 'bold'
            }}>
              📋 Task Details
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Box mb={2}>
                <Chip
                  icon={<span>{getStatusInfo(selectedTask.taskStatus).icon}</span>}
                  label={selectedTask.taskStatus}
                  sx={{
                    backgroundColor: getStatusInfo(selectedTask.taskStatus).color,
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2
                  }}
                />
              </Box>
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                {selectedTask.taskTitle}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedTask.taskDescription || 'No description provided'}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Created:</strong><br />
                    {new Date(selectedTask.taskCreatedDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Due Date:</strong><br />
                    {new Date(selectedTask.taskDueDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Category:</strong><br />
                    {selectedTask.taskCategory}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Archived:</strong><br />
                    {new Date(selectedTask.archivedDate).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setViewDialogOpen(false)}>
                Close
              </Button>
              <Button 
                onClick={() => {
                  handleRestoreTask(selectedTask.id);
                  setViewDialogOpen(false);
                }}
                startIcon={<RestoreIcon />}
                color="success"
                variant="contained"
              >
                Restore Task
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ color: 'error.main' }}>
          ⚠️ Confirm Permanent Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to permanently delete "{taskToDelete?.taskTitle}"?
          </Typography>
          <Typography color="error" sx={{ mt: 2, fontWeight: 'bold' }}>
            This action cannot be undone!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => handlePermanentDelete(taskToDelete?.id)}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Archived;