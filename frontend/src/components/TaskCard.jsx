import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  CircularProgress,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarIcon,
  Flag as PriorityIcon
} from "@mui/icons-material";

const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  availableStatuses = ["To Do", "In Progress", "Completed"],
  isLoading = false 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State Management
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize edited task when dialog opens
  const handleEditClick = () => {
    setEditedTask({
      id: task.id,
      title: task.title || task.taskTitle || '',
      description: task.description || task.taskDescription || '',
      status: task.status || task.taskStatus || 'To Do',
      priority: task.priority || 'Medium',
      dueDate: task.dueDate || '',
      tags: task.tags || []
    });
    setEditDialogOpen(true);
    setError(null);
  };

  // Handle task update
  const handleSaveTask = async () => {
    try {
      setIsUpdating(true);
      setError(null);

      // Validate required fields
      if (!editedTask.title?.trim()) {
        setError("Task title is required");
        return;
      }

      // API Call - Replace with your actual endpoint
      const updatedTaskData = {
        ...editedTask,
        title: editedTask.title.trim(),
        description: editedTask.description?.trim() || '',
        updatedAt: new Date().toISOString()
      };

      // Uncomment and modify this section for your actual API
      /*
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedTaskData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }

      const updatedTask = await response.json();
      */

      // For now, simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call parent component's update handler
      if (onEdit) {
        onEdit(updatedTaskData);
      }

      setEditDialogOpen(false);
      setEditedTask({});
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.message || "Failed to update task. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      // API Call - Replace with your actual endpoint
      /*
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
        headers: {
          // Add authorization headers if needed
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }
      */

      // For now, simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Call parent component's delete handler
      if (onDelete) {
        onDelete(task.id);
      }

      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError(error.message || "Failed to delete task. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle status change from dropdown
  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdating(true);
      
      // API Call for status update
      /*
      const response = await fetch(`/api/tasks/${task.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error(`Failed to update task status: ${response.statusText}`);
      }
      */

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (onStatusChange) {
        onStatusChange(task.id, newStatus);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      setError(error.message || "Failed to update task status.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#64748b';
    }
  };

  return (
    <>
      <Card sx={{
        mb: 2,
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 3,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        opacity: isLoading ? 0.6 : 1,
        '&:hover': {
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)',
          borderColor: '#3b82f6'
        },
        transition: 'all 0.3s ease',
        position: 'relative'
      }}>
        {isUpdating && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            borderRadius: 3
          }}>
            <CircularProgress size={24} />
          </Box>
        )}
        
        <CardContent sx={{ p: 2.5 }}>
          {/* Task Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Typography variant="h6" sx={{ 
              color: '#1e293b', 
              fontWeight: 'bold',
              flex: 1,
              pr: 1
            }}>
              {task.title || task.taskTitle}
            </Typography>
            
            {/* Priority Indicator */}
            {task.priority && (
              <Chip
                icon={<PriorityIcon sx={{ fontSize: '14px !important' }} />}
                label={task.priority}
                size="small"
                sx={{
                  backgroundColor: `${getPriorityColor(task.priority)}20`,
                  color: getPriorityColor(task.priority),
                  fontWeight: 'bold',
                  fontSize: '0.7rem'
                }}
              />
            )}
          </Box>

          {/* Task Description */}
          <Typography variant="body2" sx={{ 
            color: '#64748b',
            mb: 2,
            lineHeight: 1.6
          }}>
            {task.description || task.taskDescription}
          </Typography>

          {/* Due Date */}
          {task.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#64748b' }}>
              <CalendarIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {task.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          )}

          {/* Status Selector and Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 1 : 0
          }}>
            {/* Status Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={task.status || task.taskStatus || 'To Do'}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdating}
                sx={{ 
                  fontSize: '0.8rem',
                  '& .MuiSelect-select': {
                    py: 0.5
                  }
                }}
              >
                {availableStatuses.map((status) => (
                  <MenuItem key={status} value={status} sx={{ fontSize: '0.8rem' }}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size="small" 
                onClick={handleEditClick}
                disabled={isUpdating}
                sx={{ 
                  color: '#3b82f6',
                  backgroundColor: '#eff6ff',
                  '&:hover': { backgroundColor: '#dbeafe' },
                  transition: 'all 0.2s ease'
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={() => setDeleteDialogOpen(true)}
                disabled={isUpdating}
                sx={{ 
                  color: '#ef4444',
                  backgroundColor: '#fef2f2',
                  '&:hover': { backgroundColor: '#fee2e2' },
                  transition: 'all 0.2s ease'
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Error Display */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ mt: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Edit Task Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => !isUpdating && setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ✏️ Edit Task
          </Typography>
          {!isUpdating && (
            <IconButton onClick={() => setEditDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Task Title"
            value={editedTask.title || ''}
            onChange={(e) => setEditedTask(prev => ({ ...prev, title: e.target.value }))}
            margin="normal"
            required
            disabled={isUpdating}
          />
          
          <TextField
            fullWidth
            label="Description"
            value={editedTask.description || ''}
            onChange={(e) => setEditedTask(prev => ({ ...prev, description: e.target.value }))}
            margin="normal"
            multiline
            rows={3}
            disabled={isUpdating}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={editedTask.status || 'To Do'}
              onChange={(e) => setEditedTask(prev => ({ ...prev, status: e.target.value }))}
              label="Status"
              disabled={isUpdating}
            >
              {availableStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={editedTask.priority || 'Medium'}
              onChange={(e) => setEditedTask(prev => ({ ...prev, priority: e.target.value }))}
              label="Priority"
              disabled={isUpdating}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={editedTask.dueDate || ''}
            onChange={(e) => setEditedTask(prev => ({ ...prev, dueDate: e.target.value }))}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            disabled={isUpdating}
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={() => setEditDialogOpen(false)}
            disabled={isUpdating}
            sx={{ color: '#64748b' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveTask}
            variant="contained"
            disabled={isUpdating || !editedTask.title?.trim()}
            startIcon={isUpdating ? <CircularProgress size={16} /> : <SaveIcon />}
            sx={{ 
              backgroundColor: '#3b82f6',
              '&:hover': { backgroundColor: '#2563eb' }
            }}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => !isDeleting && setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <WarningIcon />
          Confirm Deletion
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Typography>
            Are you sure you want to delete "<strong>{task.title || task.taskTitle}</strong>"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
            sx={{ color: '#64748b' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteTask}
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={16} /> : <DeleteIcon />}
            sx={{ 
              backgroundColor: '#ef4444',
              '&:hover': { backgroundColor: '#dc2626' }
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCard;