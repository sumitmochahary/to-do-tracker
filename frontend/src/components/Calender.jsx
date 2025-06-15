import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Stack
} from '@mui/material';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const TaskCalendar = ({ tasks = [], onTasksUpdate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Helper functions
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => task.taskDueDate === dateStr);
  };

  const getPriorityFromDueDate = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 2) return 'high';
    if (diffDays <= 7) return 'medium';
    return 'low';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'overdue': return { color: '#991b1b', bgcolor: '#fee2e2', borderColor: '#fca5a5' };
      case 'high': return { color: '#dc2626', bgcolor: '#fef2f2', borderColor: '#fecaca' };
      case 'medium': return { color: '#d97706', bgcolor: '#fffbeb', borderColor: '#fed7aa' };
      case 'low': return { color: '#059669', bgcolor: '#f0fdf4', borderColor: '#bbf7d0' };
      default: return { color: '#4b5563', bgcolor: '#f9fafb', borderColor: '#e5e7eb' };
    }
  };

  const getPriorityIcon = (priority) => {
    const iconProps = { size: 12 };
    switch (priority) {
      case 'overdue':
      case 'high': return <AlertCircle {...iconProps} />;
      case 'medium': return <Clock {...iconProps} />;
      case 'low': return <CheckCircle {...iconProps} />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return { color: '#3b82f6', bgcolor: '#dbeafe' };
      case 'In Progress': return { color: '#f59e0b', bgcolor: '#fef3c7' };
      case 'Done': return { color: '#10b981', bgcolor: '#d1fae5' };
      default: return { color: '#6b7280', bgcolor: '#f3f4f6' };
    }
  };

  // Navigation functions
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const tasksForDay = getTasksForDate(date);
      const isSelected = isSameDay(date, selectedDate);
      const isToday = isSameDay(date, new Date());

      days.push(
        <Grid item xs key={day}>
          <Paper
            elevation={isSelected ? 2 : 0}
            sx={{
              height: 80,
              p: 1,
              cursor: 'pointer',
              backgroundColor: isSelected ? '#dbeafe' : isToday ? '#f0f9ff' : 'white',
              border: isSelected ? '2px solid #3b82f6' : isToday ? '2px solid #93c5fd' : '1px solid #e5e7eb',
              '&:hover': {
                backgroundColor: '#f0f9ff',
                elevation: 1
              },
              transition: 'all 0.2s ease',
              overflow: 'hidden'
            }}
            onClick={() => setSelectedDate(date)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: isToday || isSelected ? 'bold' : 'normal',
                  color: isSelected ? '#3b82f6' : isToday ? 'white' : 'text.primary',
                  bgcolor: isToday && !isSelected ? '#3b82f6' : 'transparent',
                  borderRadius: isToday && !isSelected ? '50%' : 0,
                  width: isToday && !isSelected ? 20 : 'auto',
                  height: isToday && !isSelected ? 20 : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {day}
              </Typography>
            </Box>
            
            <Box sx={{ mt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              {tasksForDay.slice(0, 2).map((task, index) => {
                const priority = getPriorityFromDueDate(task.taskDueDate);
                const priorityColors = getPriorityColor(priority);
                return (
                  <Box
                    key={index}
                    sx={{
                      fontSize: '0.625rem',
                      p: 0.25,
                      borderRadius: 0.5,
                      backgroundColor: priorityColors.bgcolor,
                      color: priorityColors.color,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {task.taskTitle}
                  </Box>
                );
              })}
              {tasksForDay.length > 2 && (
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.625rem' }}>
                  +{tasksForDay.length - 2} more
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      );
    }

    // Add empty cells for days before the first day of the month
    const emptyDays = [];
    for (let i = 0; i < firstDay; i++) {
      emptyDays.push(
        <Grid item xs key={`empty-${i}`}>
          <Box sx={{ height: 80 }} />
        </Grid>
      );
    }

    return [...emptyDays, ...days];
  };

  const selectedTasks = getTasksForDate(selectedDate);
  const totalTasks = tasks.length;
  const upcomingTasks = tasks.filter(task => new Date(task.taskDueDate) >= new Date()).length;
  // const pendingTasks = tasks.filter(task => task.taskStatus !== 'Done').length;

  return (
    <Paper elevation={0} sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
        color: 'white', 
        p: 2 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Calendar size={20} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Task Calendar
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`${totalTasks} Total`}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontSize: '0.75rem'
              }}
            />
            {/* <Chip
              label={`${pendingTasks} Pending`}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontSize: '0.75rem'
              }}
            /> */}
            <Chip
              label={`${upcomingTasks} Upcoming`}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontSize: '0.75rem'
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Calendar Navigation */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        p: 2, 
        bgcolor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <IconButton
          onClick={() => navigateMonth(-1)}
          sx={{ '&:hover': { bgcolor: '#e5e7eb' } }}
        >
          <ChevronLeft size={20} />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {getMonthYear(currentDate)}
        </Typography>
        <IconButton
          onClick={() => navigateMonth(1)}
          sx={{ '&:hover': { bgcolor: '#e5e7eb' } }}
        >
          <ChevronRight size={20} />
        </IconButton>
      </Box>

      {/* Weekdays Header */}
      <Grid container spacing={0} sx={{ borderBottom: '1px solid #e5e7eb' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid item xs key={day}>
            <Box sx={{ p: 1, textAlign: 'center', bgcolor: '#f9fafb' }}>
              <Typography variant="caption" sx={{ 
                fontWeight: 600, 
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>
                {day}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Calendar Grid */}
      <Grid container spacing={0} sx={{ borderBottom: '1px solid #e5e7eb' }}>
        {renderCalendarGrid()}
      </Grid>

      {/* Selected Date Tasks */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: '#3b82f6', borderRadius: '50%' }} />
            {formatDate(selectedDate)}
          </Typography>
          <Chip
            label={`${selectedTasks.length} task${selectedTasks.length !== 1 ? 's' : ''}`}
            size="small"
            sx={{ bgcolor: '#f3f4f6', color: 'text.secondary' }}
          />
        </Box>

        {selectedTasks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
            <Calendar size={48} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              No tasks scheduled for this day
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Enjoy your free time! 🎉
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {selectedTasks.map((task, index) => {
              const priority = getPriorityFromDueDate(task.taskDueDate);
              const priorityColors = getPriorityColor(priority);
              const statusColors = getStatusColor(task.taskStatus);
              return (
                <Card 
                  key={task.id || index}
                  elevation={0}
                  sx={{ 
                    bgcolor: '#f9fafb', 
                    border: '1px solid #e5e7eb',
                    '&:hover': { boxShadow: 1 },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.75rem'
                      }}>
                        {task.taskTitle?.charAt(0) || 'T'}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {task.taskTitle}
                        </Typography>
                        {task.taskDescription && (
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                            {task.taskDescription}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip
                            icon={getPriorityIcon(priority)}
                            label={priority === 'overdue' ? 'Overdue' : priority}
                            size="small"
                            sx={{
                              backgroundColor: priorityColors.bgcolor,
                              color: priorityColors.color,
                              border: `1px solid ${priorityColors.borderColor}`,
                              fontSize: '0.75rem',
                              textTransform: 'capitalize'
                            }}
                          />
                          <Chip
                            label={task.taskStatus}
                            size="small"
                            sx={{
                              backgroundColor: statusColors.bgcolor,
                              color: statusColors.color,
                              fontSize: '0.75rem'
                            }}
                          />
                          {task.taskCategory && (
                            <Chip
                              label={task.taskCategory}
                              size="small"
                              sx={{
                                backgroundColor: '#dbeafe',
                                color: '#1d4ed8',
                                fontSize: '0.75rem'
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                          Created: {new Date(task.taskCreatedDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        )}
      </Box>

      {/* Legend */}
      <Box sx={{ bgcolor: '#f9fafb', px: 2, py: 1.5, borderTop: '1px solid #e5e7eb' }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
          Priority Legend (based on due date):
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            { priority: 'overdue', color: '#991b1b', label: 'Overdue' },
            { priority: 'high', color: '#dc2626', label: 'High (≤2 days)' },
            { priority: 'medium', color: '#d97706', label: 'Medium (≤7 days)' },
            { priority: 'low', color: '#059669', label: 'Low (>7 days)' }
          ].map(({ priority, color, label }) => (
            <Box key={priority} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: color, borderRadius: '50%' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default TaskCalendar;