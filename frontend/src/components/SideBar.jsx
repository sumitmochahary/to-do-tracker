import React from "react";
import { 
  Box, 
  Typography, 
  Button,
  IconButton,
  Divider
} from "@mui/material";
import { 
  Dashboard as DashboardIcon, 
  ViewColumn as ViewColumnIcon,
  CalendarToday as CalendarIcon,
  Assessment as ReportsIcon,
  Home as HomeIcon,
  Task as TaskIcon,
  Settings as SettingsIcon,
  Close as CloseIcon
} from "@mui/icons-material";

const Sidebar = ({ onClose }) => {
  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        backgroundColor: '#1e293b',
        borderRight: '1px solid #334155',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
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
          TaskBoard
        </Typography>
        
        {/* Close button for mobile */}
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
          sx={{ 
            color: '#e2e8f0', 
            justifyContent: 'flex-start',
            backgroundColor: '#334155',
            '&:hover': { 
              backgroundColor: '#475569',
              transform: 'translateX(4px)'
            },
            borderRadius: 2,
            p: 1.5,
            textTransform: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          Home
        </Button>
        
        <Button 
          startIcon={<TaskIcon />}
          sx={{ 
            color: '#94a3b8', 
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
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          My Tasks
        </Button>
        
        <Button 
          startIcon={<CalendarIcon />}
          sx={{ 
            color: '#94a3b8', 
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
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          Calendar View
        </Button>
        
        <Button 
          startIcon={<ReportsIcon />}
          sx={{ 
            color: '#94a3b8', 
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
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          Reports
        </Button>
        
        <Divider sx={{ borderColor: '#334155', my: 2 }} />
        
        <Button 
          startIcon={<SettingsIcon />}
          sx={{ 
            color: '#94a3b8', 
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
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
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
          Task Management v1.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;