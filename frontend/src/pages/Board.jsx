import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Alert,
  Fab,
  Collapse,
  useMediaQuery,
  useTheme,
  Container,
  AppBar,
  Toolbar,
  Drawer
} from "@mui/material";

import {
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Dashboard as DashboardIcon,
  ViewColumn as ViewColumnIcon,
  Menu as MenuIcon,
  Task as TaskIcon,
  Settings as SettingsIcon,
  Info as InfoIcon
} from "@mui/icons-material";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Column from "../components/Column";
import NewTaskForm from "../components/NewTaskForm";
import TaskCard from "../components/TaskCard";
import { fetchTask } from "../services/TaskService";

const SIDEBAR_WIDTH = 260;

// Main Board Component
const Board = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State Management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [columns, setColumns] = useState(["To Do", "In Progress", "Completed"]);
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [archivedTasks, setArchivedTasks] = useState([]);

  // Effects
  useEffect(() => {
    loadTasks();
  }, []);

  // API Functions
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchTask();
      // Normalize task IDs to ensure consistency
      const normalizedTasks = response.map(task => ({
        ...task,
        id: task.id || task.taskId, // Ensure we have a consistent ID field
        taskId: task.id || task.taskId // Keep both for backward compatibility
      }));
      setTasks(normalizedTasks);
    } catch {
      // console.error("Failed to fetch tasks", error);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Utility function to get consistent task ID
  const getTaskId = useCallback((task) => {
    return task.id || task.taskId;
  }, []);

  // Event Handlers - Using useCallback to prevent unnecessary re-renders
  const handleTaskAdded = useCallback((newTask) => {
    const taskWithId = {
      ...newTask,
      id: newTask.id || newTask.taskId || Date.now().toString(), // Ensure we have an ID
      taskId: newTask.id || newTask.taskId || Date.now().toString(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    setTasks(prev => {
      const updated = [...prev, taskWithId];
      // console.log('Task added successfully:', taskWithId);
      return updated;
    });
    setShowTaskForm(false);
  }, []);

  const handleTaskUpdate = useCallback((updatedTask) => {
    const updatedTaskId = getTaskId(updatedTask);

    setTasks(prevTasks =>
      prevTasks.map(task => {
        const taskId = getTaskId(task);
        if (taskId === updatedTaskId) {
          return {
            ...task,
            ...updatedTask,
            id: taskId, // Ensure ID is consistent
            taskId: taskId,
            lastModified: new Date().toISOString()
          };
        }
        return task;
      })
    );

    // console.log('Task updated successfully:', updatedTask);
  }, [getTaskId]);


  const handleTaskDelete = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.filter(task => getTaskId(task) !== taskId)
    );

    // console.log('Task deleted successfully, ID:', taskId);
  }, [getTaskId]);


  const handleTaskStatusChange = useCallback((taskId, newStatus) => {
    setTasks(prev => {
      const updated = prev.map(task => {
        const currentTaskId = getTaskId(task);
        if (currentTaskId === taskId) {
          return {
            ...task,
            taskStatus: newStatus,
            lastModified: new Date().toISOString()
          };
        }
        return task;
      });

      // console.log(`Task moved to ${newStatus}, ID:`, taskId);
      return updated;
    });
  }, [getTaskId]);

  const handleTaskArchive = useCallback((taskId) => {
    setTasks(prevTasks => {
      const taskToArchive = prevTasks.find(task => getTaskId(task) === taskId);

      if (taskToArchive) {
        // Add to archived tasks
        const archivedTask = {
          ...taskToArchive,
          archivedAt: new Date().toISOString()
        };

        setArchivedTasks(prevArchived => [...prevArchived, archivedTask]);

        // Remove from active tasks
        const updated = prevTasks.filter(task => getTaskId(task) !== taskId);
        // console.log('Task archived successfully:', archivedTask);
        return updated;
      }

      return prevTasks;
    });
  }, [getTaskId, setArchivedTasks]);


  const handleAddColumn = useCallback(() => {
    if (newColumnTitle.trim() && !columns.includes(newColumnTitle.trim())) {
      setColumns(prev => [...prev, newColumnTitle.trim()]);
      setNewColumnTitle("");
      setShowColumnDialog(false);
      // console.log('Column added:', newColumnTitle.trim());
    }
  }, [newColumnTitle, columns]);

  const handleRemoveColumn = useCallback((columnTitle) => {
    const defaultColumns = ["To Do", "In Progress", "Completed"];

    if (!defaultColumns.includes(columnTitle)) {
      // Remove the column
      setColumns(prev => prev.filter(col => col !== columnTitle));

      // Move tasks from removed column to "To Do"
      setTasks(prev =>
        prev.map(task => {
          if (task.taskStatus === columnTitle) {
            return {
              ...task,
              taskStatus: "To Do",
              lastModified: new Date().toISOString()
            };
          }
          return task;
        })
      );

      // console.log(`Column "${columnTitle}" removed and tasks moved to "To Do"`);
    }
  }, []);

  const handleSearchResults = useCallback((results) => {
    // console.log("Search results:", results);
    results
  }, []);

  const handleTaskSelection = useCallback((task) => {
    // console.log("Selected task:", task);
    task
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Utility Functions - Memoized to prevent unnecessary recalculations
  const getTasksByStatus = useCallback((status) => {
    return (tasks || []).filter(task => task.taskStatus === status);
  }, [tasks]);

  // Loading State
  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: '#f8fafc',
        px: { xs: 1, sm: 2, md: 2 }
      }}>
        <CircularProgress
          size={isSmallMobile ? 60 : 80}
          sx={{ color: '#3b82f6' }}
        />
        <Typography
          variant={isSmallMobile ? "h6" : "h5"}
          sx={{
            color: '#1e293b',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Loading your tasks...
        </Typography>
      </Box>
    );
  }

  // Main Render
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {!isMobile && (
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={handleSidebarClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              backgroundColor: '#1e293b',
              borderRight: '1px solid #334155',
            },
          }}
        >
          <SideBar />
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={sidebarOpen}
          onClose={handleSidebarClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              backgroundColor: '#1e293b',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            },
          }}
        >
          <SideBar onClose={handleSidebarClose} />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f8fafc',
          minHeight: '100vh',
          width: isMobile ? '100%' : `calc(100% - ${SIDEBAR_WIDTH}px)`,
        }}
      >
        {/* Header Component */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1100 }}>
          <Header
            tasks={tasks}
            onSearchResults={handleSearchResults}
            onTaskSelect={handleTaskSelection}
            searchPlaceholder="Search your tasks..."
            showFilters={true}
            isMobile={isMobile}
            onMenuClick={toggleSidebar}
          />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Mobile Header Content */}
          {isMobile && (
            <Box sx={{
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e2e8f0',
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
            }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#64748b',
                  textAlign: 'center',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                Organize your tasks efficiently
              </Typography>
            </Box>
          )}

          {/* Main Content Container */}
          <Container
            maxWidth="xl"
            sx={{
              flexGrow: 1,
              px: { xs: 1, sm: 2, md: 3, lg: 4 },
              py: { xs: 2, sm: 3, md: 4 },
              backgroundColor: 'transparent'
            }}
          >
            {/* Hero Section */}
            <Box sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%)',
              borderRadius: { xs: 2, sm: 3, md: 4 },
              p: { xs: 2, sm: 3, md: 4 },
              mb: { xs: 2, sm: 3, md: 4 },
              color: 'white',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
              textAlign: { xs: 'center', md: 'left' },
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.15) 0%, transparent 60%)',
                zIndex: 1
              },
              '& > *': {
                position: 'relative',
                zIndex: 2
              }
            }}>
              <Typography
                textAlign="center"
                variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
                sx={{
                  fontWeight: 'bold',
                  mb: { xs: 1, sm: 2 },
                  fontSize: {
                    xs: '1.5rem',
                    sm: '2rem',
                    md: '2.5rem',
                    lg: '3rem'
                  },
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 }
                }}
              >
                🎯 To-Do Tracker Board
              </Typography>
              <Typography
                textAlign="center"
                variant={isSmallMobile ? "body1" : "h6"}
                sx={{
                  opacity: 0.9,
                  fontSize: {
                    xs: '0.9rem',
                    sm: '1rem',
                    md: '1.1rem',
                    lg: '1.25rem'
                  },
                  lineHeight: { xs: 1.4, sm: 1.5 }
                }}
              >
                Organize, prioritize, and track your work efficiently
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: { xs: 2, sm: 3 },
                  borderRadius: { xs: 2, sm: 3 },
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  '& .MuiAlert-message': { color: '#dc2626' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'stretch', sm: 'center' }
                }}
              >
                <Box sx={{ mb: { xs: 1, sm: 0 } }}>
                  {error}
                </Box>
                <Button
                  size="small"
                  onClick={loadTasks}
                  sx={{
                    ml: { xs: 0, sm: 2 },
                    color: '#dc2626',
                    alignSelf: { xs: 'flex-start', sm: 'center' },
                    '&:hover': { backgroundColor: 'rgba(220, 38, 38, 0.1)' }
                  }}
                >
                  Retry
                </Button>
              </Alert>
            )}

            {/* Task Form Toggle Button */}
            <Box sx={{
              mb: { xs: 2, sm: 3, md: 4 },
              display: 'flex',
              justifyContent: 'center',
              px: { xs: 1, sm: 0 }
            }}>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                onClick={() => setShowTaskForm(!showTaskForm)}
                startIcon={showTaskForm ? <CloseIcon /> : <AddIcon />}
                fullWidth={isSmallMobile}
                sx={{
                  backgroundColor: showTaskForm ? '#ef4444' : '#3b82f6',
                  color: '#ffffff',
                  borderRadius: { xs: 3, sm: 4 },
                  padding: {
                    xs: '10px 20px',
                    sm: '12px 28px',
                    md: '14px 32px',
                    lg: '16px 40px'
                  },
                  fontWeight: 'bold',
                  fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem', lg: '1.1rem' },
                  boxShadow: showTaskForm
                    ? '0 8px 25px rgba(239, 68, 68, 0.3)'
                    : '0 8px 25px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    backgroundColor: showTaskForm ? '#dc2626' : '#2563eb',
                    transform: 'translateY(-1px)',
                    boxShadow: showTaskForm
                      ? '0 12px 35px rgba(239, 68, 68, 0.4)'
                      : '0 12px 35px rgba(59, 130, 246, 0.4)',
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {showTaskForm ? "Close Task Form" : "Create New Task"}
              </Button>
            </Box>

            {/* Collapsible Task Form */}
            <Box mb={{ xs: 2, sm: 3 }}>
              <Collapse in={showTaskForm}>
                <Box sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: { xs: 2, sm: 3 },
                  p: { xs: 2, sm: 3 },
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <NewTaskForm onTaskAdded={handleTaskAdded} availableStatuses={columns} />
                </Box>
              </Collapse>
            </Box>

            {/* Task Columns Grid */}
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ display: "flex", justifyContent: { md: "space-around", sm: "center", xs: "center" } }}>
              {columns.map((column, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={columns.length <= 3 ? 4 : 6}
                  lg={columns.length <= 3 ? 4 : columns.length <= 4 ? 3 : 6}
                  xl={columns.length <= 6 ? 2 : 4}
                  key={column}
                >
                  <Column
                    title={column}
                    tasks={getTasksByStatus(column)}
                    onRemoveColumn={handleRemoveColumn}
                    isRemovable={!["To Do", "In Progress", "Completed"].includes(column)}
                    columnIndex={index}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDeleted={handleTaskDelete}
                    onTaskArchive={handleTaskArchive}
                    onTaskStatusChange={handleTaskStatusChange}
                    TaskCardComponent={TaskCard}
                  />
                </Grid>
              ))}
            </Grid>

          </Container>
        </Box>
      </Box>

      {/* Floating Action Button - Add Column */}
      <Fab
        color="primary"
        aria-label="add column"
        onClick={() => setShowColumnDialog(true)}
        size={isMobile ? "medium" : "large"}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 20, md: 24, lg: 32 },
          right: { xs: 16, sm: 20, md: 24, lg: 32 },
          backgroundColor: '#10b981',
          color: '#ffffff',
          width: { xs: 52, sm: 56, md: 64 },
          height: { xs: 52, sm: 56, md: 64 },
          '&:hover': {
            backgroundColor: '#059669',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
          zIndex: 1000
        }}
      >
        <ViewColumnIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }} />
      </Fab>

      {/* Add Column Dialog */}
      <Dialog
        open={showColumnDialog}
        onClose={() => setShowColumnDialog(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isSmallMobile}
        PaperProps={{
          sx: {
            borderRadius: isSmallMobile ? 0 : { xs: 3, sm: 4 },
            backgroundColor: '#ffffff',
            boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
            margin: { xs: 0, sm: 2 },
            maxHeight: { xs: '100vh', sm: '90vh' }
          }
        }}
      >
        <DialogTitle sx={{
          backgroundColor: '#f8fafc',
          color: '#1e293b',
          fontWeight: 'bold',
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.3rem' },
          borderBottom: '2px solid #e2e8f0',
          textAlign: { xs: 'center', sm: 'left' },
          py: { xs: 2, sm: 2.5 }
        }}>
          🏗️ Add New List
        </DialogTitle>
        <DialogContent sx={{
          pt: { xs: 2, sm: 3 },
          pb: 2,
          px: { xs: 2, sm: 3 },
          backgroundColor: '#ffffff'
        }}>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="List Name"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f8fafc',
                borderRadius: { xs: 2, sm: 3 }
              }
            }}
            helperText="Enter a unique name for your new list"
          />
        </DialogContent>
        <DialogActions sx={{
          p: { xs: 2, sm: 3 },
          gap: { xs: 1, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          backgroundColor: '#ffffff'
        }}>
          <Button
            onClick={() => setShowColumnDialog(false)}
            fullWidth={isSmallMobile}
            sx={{
              color: '#64748b',
              borderRadius: { xs: 2, sm: 3 },
              padding: { xs: '8px 20px', sm: '10px 24px' },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': { backgroundColor: '#f1f5f9' }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddColumn}
            variant="contained"
            fullWidth={isSmallMobile}
            disabled={!newColumnTitle.trim() || columns.includes(newColumnTitle.trim())}
            sx={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              borderRadius: { xs: 2, sm: 3 },
              padding: { xs: '8px 20px', sm: '10px 24px' },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#059669',
              },
              '&:disabled': {
                backgroundColor: '#94a3b8',
                color: '#ffffff'
              }
            }}
          >
            Add List
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Board;