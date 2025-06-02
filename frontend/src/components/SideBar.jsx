import React from "react";
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Toolbar, 
  Box, 
  Typography, 
  Button 
} from "@mui/material";
import { 
  Dashboard as DashboardIcon, 
  ViewColumn as ViewColumnIcon,
  CalendarToday as CalendarIcon,
  Assessment as ReportsIcon,
  Home as HomeIcon,
  Task as TaskIcon,
  Settings as SettingsIcon
} from "@mui/icons-material";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: 260, 
          boxSizing: "border-box",
          bgcolor: '#1e293b',
          borderRight: '1px solid #334155',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
        },
      }}
    >
      <Toolbar />
      
      {/* Header Section */}
      <Box sx={{ p: 3, mb: 2 }}>
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
      </Box>
      
      {/* Navigation Items */}
      <Box sx={{ px: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button 
          startIcon={<HomeIcon />} 
          sx={{ 
            color: '#e2e8f0', 
            justifyContent: 'flex-start',
            backgroundColor: '#334155',
            '&:hover': { backgroundColor: '#475569' },
            borderRadius: 2,
            p: 1.5,
            textTransform: 'none',
            fontSize: '0.95rem'
          }}
        >
          Home
        </Button>
        
        <Button 
          startIcon={<TaskIcon />}
          sx={{ 
            color: '#94a3b8', 
            justifyContent: 'flex-start',
            '&:hover': { backgroundColor: '#334155' },
            borderRadius: 2,
            p: 1.5,
            textTransform: 'none',
            fontSize: '0.95rem'
          }}
        >
          My Tasks
        </Button>
        
        <Button 
          startIcon={<CalendarIcon />}
          sx={{ 
            color: '#94a3b8', 
            justifyContent: 'flex-start',
            '&:hover': { backgroundColor: '#334155' },
            borderRadius: 2,
            p: 1.5,
            textTransform: 'none',
            fontSize: '0.95rem'
          }}
        >
          Calendar View
        </Button>
        
        <Button 
          startIcon={<ReportsIcon />}
          sx={{ 
            color: '#94a3b8', 
            justifyContent: 'flex-start',
            '&:hover': { backgroundColor: '#334155' },
            borderRadius: 2,
            p: 1.5,
            textTransform: 'none',
            fontSize: '0.95rem'
          }}
        >
          Reports
        </Button>
        
        <Button 
          startIcon={<SettingsIcon />}
          sx={{ 
            color: '#94a3b8', 
            justifyContent: 'flex-start',
            '&:hover': { backgroundColor: '#334155' },
            borderRadius: 2,
            p: 1.5,
            textTransform: 'none',
            fontSize: '0.95rem'
          }}
        >
          Settings
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;