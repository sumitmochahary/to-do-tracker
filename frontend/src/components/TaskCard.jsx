import React from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton 
} from "@mui/material";
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon 
} from "@mui/icons-material";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card sx={{
      mb: 2,
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: 3,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      '&:hover': {
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        transform: 'translateY(-2px)',
        borderColor: '#3b82f6'
      },
      transition: 'all 0.3s ease'
    }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ 
          color: '#1e293b', 
          fontWeight: 'bold',
          mb: 1.5
        }}>
          {task.title}
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#64748b',
          mb: 2,
          lineHeight: 1.6
        }}>
          {task.description}
        </Typography>
        
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => onEdit && onEdit(task)}
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
            onClick={() => onDelete && onDelete(task.id)} 
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
      </CardContent>
    </Card>
  );
};

export default TaskCard;