import React from "react";
import { Box, Paper, Typography, Card, CardContent, Chip, IconButton } from "@mui/material";
import { CalendarToday, Assignment, CheckCircle, Schedule, Delete } from "@mui/icons-material";

const getStatusColor = (status, index = 0) => {
  // Predefined gradients for default columns
  const predefinedGradients = {
    'To Do': {
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: <Assignment sx={{ color: 'white', fontSize: 20 }} />,
      emoji: '📋'
    },
    'In Progress': {
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: <Schedule sx={{ color: 'white', fontSize: 20 }} />,
      emoji: '⚡'
    },
    'Completed': {
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: <CheckCircle sx={{ color: 'white', fontSize: 20 }} />,
      emoji: '✅'
    }
  };

  // If it's a predefined status, return its specific gradient
  if (predefinedGradients[status]) {
    return predefinedGradients[status];
  }

  // Dynamic gradients for custom columns
  const dynamicGradients = [
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #96fbc4 0%, #f9f047 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  const gradientIndex = index % dynamicGradients.length;
  
  return {
    gradient: dynamicGradients[gradientIndex],
    icon: <Assignment sx={{ color: 'white', fontSize: 20 }} />,
    emoji: '🔖'
  };
};

const getDueDateStatus = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { status: 'overdue', color: '#ff6b6b', text: `${Math.abs(diffDays)} days overdue` };
  } else if (diffDays === 0) {
    return { status: 'today', color: '#ffa726', text: 'Due today' };
  } else if (diffDays <= 3) {
    return { status: 'soon', color: '#ffeb3b', text: `${diffDays} days left` };
  } else {
    return { status: 'normal', color: '#66bb6a', text: `${diffDays} days left` };
  }
};

const TaskCard = ({ task }) => {
  const dueDateInfo = getDueDateStatus(task.taskDueDate);
  
  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: '#2c3e50',
            lineHeight: 1.3
          }}
        >
          {task.taskTitle}
        </Typography>
        
        {task.taskDescription && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              lineHeight: 1.5,
              color: '#7f8c8d'
            }}
          >
            {task.taskDescription}
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarToday sx={{ fontSize: 16, color: '#95a5a6', mr: 1 }} />
          <Typography variant="caption" sx={{ color: '#7f8c8d', fontWeight: 500 }}>
            Due: {new Date(task.taskDueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </Typography>
        </Box>

        <Chip
          label={dueDateInfo.text}
          size="small"
          sx={{
            backgroundColor: dueDateInfo.color,
            color: dueDateInfo.status === 'soon' ? '#333' : 'white',
            fontWeight: 'bold',
            fontSize: '11px',
          }}
        />
      </CardContent>
    </Card>
  );
};

const Column = ({ title, tasks = [], onRemoveColumn, isRemovable = false, columnIndex = 0 }) => {
  const statusInfo = getStatusColor(title, columnIndex);
  
  return (
    
    <Paper 
      elevation={0} 
      sx={{ 
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid #e9ecef',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Column Header */}
      <Box
        sx={{
          background: statusInfo.gradient,
          p: 3,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ mr: 2, fontSize: '24px' }}>
          {statusInfo.emoji}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </Typography>
        </Box>
        {statusInfo.icon}
        
        {/* Remove Column Button - Only show for custom columns */}
        {isRemovable && (
          <IconButton
            onClick={() => onRemoveColumn(title)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 107, 0.8)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
              width: 32,
              height: 32,
            }}
            size="small"
          >
            <Delete sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      {/* Column Content */}
      <Box sx={{ p: 2, minHeight: 400, backgroundColor: '#fafbfc' }}>
        {tasks.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 300,
              color: '#95a5a6',
              textAlign: 'center'
            }}
          >
            <Box sx={{ fontSize: '48px', mb: 2, opacity: 0.3 }}>
              {statusInfo.emoji}
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500, opacity: 0.7 }}>
              No tasks yet
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.5, mt: 1 }}>
              {title === 'To Do' ? 'Add your first task!' : 
               title === 'In Progress' ? 'Move tasks here when you start working' :
               'Complete tasks will appear here'}
            </Typography>
          </Box>
        ) : (
          <Box>
            {tasks.map((task) => (
              <TaskCard key={task.taskId || task.id} task={task} />
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Column;