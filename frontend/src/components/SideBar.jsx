import React, { useState } from "react";
import {
   Box,
   Typography,
   Button,
   IconButton,
   Divider
} from "@mui/material";
import {
   Dashboard as DashboardIcon,
   CalendarToday as CalendarIcon,
   Assessment as ReportsIcon,
   Home as HomeIcon,
   Task as TaskIcon,
   Settings as SettingsIcon,
   Close as CloseIcon
} from "@mui/icons-material";
import { useNavigate } from 'react-router';
import Calendar from "./Calender"; // Updated import name
import Archived from "./Archived";

const Sidebar = ({ onClose, tasks = [] }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          width: 260,
          minHeight: '100vh',
          backgroundColor: '#1e293b',
          borderRight: '1px solid #334155',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1200,
        }}
      >
        {/* Header Section */}
        <Box sx={{
          p: 3,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h5" sx={{
            color: '#f1f5f9',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <DashboardIcon sx={{ color: '#3b82f6' }} />
            To-Do Tracker
          </Typography>

          {onClose && (
            <IconButton
              onClick={onClose}
              sx={{
                color: '#94a3b8',
                '&:hover': {
                  backgroundColor: '#334155',
                  color: '#f1f5f9'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Divider sx={{ borderColor: '#334155', mx: 2, mb: 2 }} />

        {/* Navigation Items */}
        <Box sx={{
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          flexGrow: 1
        }}>
          <Button
            startIcon={<HomeIcon />}
            sx={buttonStyles(true)}
          >
            Home
          </Button>

          <Button
            startIcon={<TaskIcon />}
            sx={buttonStyles()}
          >
            My Tasks
          </Button>

          <Button
            startIcon={<CalendarIcon />}
            onClick={() => setShowCalendar(prev => !prev)}
            sx={buttonStyles(showCalendar)}
          >
            Calendar View
          </Button>

          <Button
  startIcon={<ReportsIcon />}
  onClick={() => navigate('/archived')}
  sx={buttonStyles()}
>
  Archived
</Button>



          <Divider sx={{ borderColor: '#334155', my: 2 }} />

          <Button
            startIcon={<SettingsIcon />}
            sx={buttonStyles()}
          >
            Settings
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{
          p: 3,
          mt: 'auto',
          borderTop: '1px solid #334155'
        }}>
          <Typography variant="caption" sx={{
            color: '#64748b',
            display: 'block',
            textAlign: 'center'
          }}>
            To-Do Tracker v1.0
          </Typography>
        </Box>
      </Box>

      {/* Hovering Calendar Card */}
      {showCalendar && (
        <>
          {/* Backdrop */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1300,
              backdropFilter: 'blur(2px)',
            }}
            onClick={() => setShowCalendar(false)}
          />
          
          {/* Calendar Card */}
          <Box
            sx={{
              position: 'fixed',
              left: 280, // Position next to sidebar (260px + 20px gap)
              top: '50%',
              transform: 'translateY(-50%)',
              width: 380,
              maxHeight: '90vh',
              backgroundColor: '#ffffff',
              borderRadius: 3,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              zIndex: 1400,
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              animation: 'slideIn 0.3s ease-out',
              '@keyframes slideIn': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(-50%) translateX(-20px) scale(0.95)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(-50%) translateX(0) scale(1)',
                },
              },
            }}
          >
            {/* Close button */}
            <IconButton
              onClick={() => setShowCalendar(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                zIndex: 1500,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                color: '#6b7280',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            
            <Calendar tasks={tasks} />
          </Box>
        </>
      )}
    </>
  );
};

// Enhanced button styles
const buttonStyles = (active = false) => ({
  color: active ? '#e2e8f0' : '#94a3b8',
  backgroundColor: active ? '#334155' : 'transparent',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: '#334155',
    color: '#e2e8f0',
    transform: 'translateX(4px)'
  },
  borderRadius: 2,
  p: 1.5,
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: active ? 600 : 500,
  transition: 'all 0.2s ease',
  borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
  marginLeft: active ? '-3px' : 0,
  position: 'relative',
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 6,
    height: 6,
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
  } : {}
});

export default Sidebar;