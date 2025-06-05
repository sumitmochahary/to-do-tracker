import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  TextField, 
  MenuItem, 
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Box
} from '@mui/material';
import { 
  Edit as EditIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { archiveTask, deleteTask, updateTask } from '../services/TaskService';

const TaskCard = ({ 
  task, 
  onTaskUpdated, 
  onTaskDeleted, 
  onTaskArchived,
  onStatusChange, 
  availableStatuses = ["To Do", "In Progress", "Completed"]
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [loading, setLoading] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

  // Function to handle task updates
  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await updateTask({
        taskId: task.taskId || task.id,
        taskTitle: editedTask.taskTitle,
        taskDescription: editedTask.taskDescription,
        taskStatus: editedTask.taskStatus,
        taskDueDate: editedTask.taskDueDate,
        taskCategory: editedTask.taskCategory,
        userId: task.userId
      });
      
      if (onTaskUpdated) {
        onTaskUpdated(response);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle task deletion
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTask(task.taskId || task.id);
      if (onTaskDeleted) {
        onTaskDeleted(task.taskId || task.id);
      }
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle task archiving
  const handleArchive = async () => {
    try {
      setLoading(true);
      await archiveTask(task.taskId || task.id);
      
      if (onTaskArchived) {
        onTaskArchived(task.taskId || task.id);
      }
      setArchiveDialogOpen(false);
    } catch (error) {
      console.error('Error archiving task:', error);
      alert('Failed to archive task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle status change (mark as complete)
  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const response = await updateTask({
        taskId: task.taskId || task.id,
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        taskStatus: newStatus,
        taskDueDate: task.taskDueDate,
        taskCategory: task.taskCategory,
        userId: task.userId
      });
      
      if (onStatusChange) {
        onStatusChange(task.taskId || task.id, newStatus);
      } else if (onTaskUpdated) {
        onTaskUpdated(response);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status. Please try again.');
    } finally {
      setLoading(false);
    }
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

  // Get category info
  const getCategoryInfo = (category) => {
    switch (category) {
      case 'Personal':
        return { icon: '👤' };
      case 'Work':
        return { icon: '💼' };
      default:
        return { icon: '📂' };
    }
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (!task.taskDueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.taskDueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today && task.taskStatus !== 'Completed';
  };

  // Calculate days until due
  const getDaysUntilDue = () => {
    if (!task.taskDueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.taskDueDate);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const statusInfo = getStatusInfo(task.taskStatus);
  const categoryInfo = getCategoryInfo(task.taskCategory);
  const overdue = isOverdue();
  const daysUntilDue = getDaysUntilDue();

  return (
    <>
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: overdue ? '0 4px 12px rgba(244, 67, 54, 0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        border: overdue ? '2px solid #f44336' : '2px solid transparent',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: overdue ? '0 8px 24px rgba(244, 67, 54, 0.4)' : '0 8px 24px rgba(0,0,0,0.15)',
          border: overdue ? '2px solid #f44336' : '2px solid #667eea'
        }
      }}>
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Status Badge and Due Date Warning */}
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
            {overdue && (
              <Chip
                label={`Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? 's' : ''}`}
                size="small"
                sx={{ 
                  backgroundColor: '#f44336',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            )}
            {!overdue && daysUntilDue <= 3 && task.taskStatus !== 'Completed' && (
              <Chip
                label={daysUntilDue === 0 ? 'Due Today' : `${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''} left`}
                size="small"
                sx={{ 
                  backgroundColor: daysUntilDue === 0 ? '#ff9800' : '#2196f3',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            )}
          </Box>

          {/* Task Title */}
          {isEditing ? (
            <TextField
              fullWidth
              value={editedTask.taskTitle}
              onChange={(e) => setEditedTask({...editedTask, taskTitle: e.target.value})}
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
          ) : (
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
          )}

          {/* Task Description */}
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={3}
              value={editedTask.taskDescription}
              onChange={(e) => setEditedTask({...editedTask, taskDescription: e.target.value})}
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
          ) : (
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
          )}

          {/* Due Date */}
          {isEditing ? (
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={editedTask.taskDueDate}
              onChange={(e) => setEditedTask({...editedTask, taskDueDate: e.target.value})}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Due:</strong> {new Date(task.taskDueDate).toLocaleDateString()}
            </Typography>
          )}

          {/* Created Date */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <strong>Created:</strong> {new Date(task.taskCreatedDate).toLocaleDateString()}
          </Typography>

          {/* Status Dropdown (if editing) */}
          {isEditing && (
            <TextField
              select
              fullWidth
              label="Status"
              value={editedTask.taskStatus}
              onChange={(e) => setEditedTask({...editedTask, taskStatus: e.target.value})}
              sx={{ mb: 2 }}
            >
              {availableStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {getStatusInfo(status).icon} {status}
                </MenuItem>
              ))}
            </TextField>
          )}
        </CardContent>

        {/* Action Buttons */}
        <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
          {isEditing ? (
            <Box>
              <Button 
                size="small" 
                onClick={handleSave} 
                color="primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button 
                size="small" 
                onClick={() => {
                  setIsEditing(false);
                  setEditedTask(task);
                }}
                sx={{ ml: 1 }}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <>
              <Box>
                <Tooltip title="View Details">
                  <IconButton 
                    size="small" 
                    onClick={() => setViewDialogOpen(true)}
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Edit Task">
                  <IconButton 
                    size="small" 
                    onClick={() => setIsEditing(true)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box>
                {task.taskStatus !== 'Completed' && (
  <Tooltip title="Mark Complete">
    <IconButton 
      size="small" 
      onClick={() => handleStatusChange('Completed')}  // Use handleStatusChange instead
      color="success"
    >
      <CheckCircleIcon />
    </IconButton>
  </Tooltip>
)}
                
                <Tooltip title="Archive Task">
                  <IconButton 
                    size="small" 
                    onClick={() => setArchiveDialogOpen(true)}
                    color="warning"
                  >
                    <ArchiveIcon />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Delete Task">
                  <IconButton 
                    size="small" 
                    onClick={() => setDeleteDialogOpen(true)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </CardActions>
      </Card>

      {/* View Task Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm" 
        fullWidth
      >
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
              icon={<span>{statusInfo.icon}</span>}
              label={task.taskStatus}
              sx={{
                backgroundColor: statusInfo.color,
                color: 'white',
                fontWeight: 'bold',
                mb: 2
              }}
            />
            {overdue && (
              <Chip
                label="OVERDUE"
                sx={{ 
                  backgroundColor: '#f44336',
                  color: 'white',
                  fontWeight: 'bold',
                  ml: 1
                }}
              />
            )}
          </Box>
          
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            {task.taskTitle}
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            {task.taskDescription || 'No description provided'}
          </Typography>
          
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="body2">
              <strong>Created:</strong> {new Date(task.taskCreatedDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>Due Date:</strong> {new Date(task.taskDueDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>Category:</strong> {task.taskCategory}
            </Typography>
            <Typography variant="body2">
              <strong>User:</strong> {task.userId}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setViewDialogOpen(false)}>
            Close
          </Button>
          <Button 
            onClick={() => {
              setViewDialogOpen(false);
              setIsEditing(true);
            }}
            startIcon={<EditIcon />}
            color="primary"
            variant="contained"
          >
            Edit Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ color: 'error.main' }}>
          ⚠️ Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{task.taskTitle}"?
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            This will move the task to trash. You can restore it later if needed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Archive Confirmation Dialog */}
      <Dialog 
        open={archiveDialogOpen} 
        onClose={() => setArchiveDialogOpen(false)}
      >
        <DialogTitle sx={{ color: 'warning.main' }}>
          📦 Archive Task
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to archive "{task.taskTitle}"?
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Archived tasks can be viewed and restored from the Archive section.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setArchiveDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleArchive}
            color="warning"
            variant="contained"
            startIcon={<ArchiveIcon />}
            disabled={loading}
          >
            {loading ? 'Archiving...' : 'Archive'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCard;