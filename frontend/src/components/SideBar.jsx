// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Divider,
//   Tooltip
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   CalendarToday as CalendarIcon,
//   Assessment as ReportsIcon,
//   Home as HomeIcon,
//   Task as TaskIcon,
//   Settings as SettingsIcon,
//   Close as CloseIcon
// } from "@mui/icons-material";
// import { useNavigate } from 'react-router';
// import Calender from "./Calender"; // Import the Material-UI compatible calendar
// import Archived from "./Archived";

// const Sidebar = ({ onClose, tasks = [] }) => {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showArchived, setShowArchived] = useState(false);
//   const navigate = useNavigate();

//   // Handler to toggle calendar visibility
//   const handleCalendarToggle = () => {
//     setShowCalendar(prev => !prev);
//     // Close archived if it's open
//     if (showArchived) {
//       setShowArchived(false);
//     }
//   };

//   // Handler to close calendar
//   const handleCloseCalendar = () => {
//     setShowCalendar(false);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           width: 260,
//           minHeight: '100vh',
//           backgroundColor: '#1e293b',
//           borderRight: '1px solid #334155',
//           boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
//           display: 'flex',
//           flexDirection: 'column',
//           position: 'relative',
//           zIndex: 1200,
//         }}
//       >
//         {/* Header Section */}
//         <Box sx={{
//           p: 3,
//           mb: 2,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}>
//           <Typography variant="h5" sx={{
//             color: '#f1f5f9',
//             fontWeight: 'bold',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1
//           }}>
//             <DashboardIcon sx={{ color: '#3b82f6' }} />
//             To-Do Tracker
//           </Typography>

//           {onClose && (
//             <IconButton
//               onClick={onClose}
//               sx={{
//                 color: '#94a3b8',
//                 '&:hover': {
//                   backgroundColor: '#334155',
//                   color: '#f1f5f9'
//                 }
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           )}
//         </Box>

//         <Divider sx={{ borderColor: '#334155', mx: 2, mb: 2 }} />

//         {/* Navigation Items */}
//         <Box sx={{
//           px: 3,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 1,
//           flexGrow: 1
//         }}>
//           <Button
//             startIcon={<HomeIcon />}
//             sx={buttonStyles(true)}
//           >
//             Home
//           </Button>

//           <Button
//             startIcon={<CalendarIcon />}
//             onClick={handleCalendarToggle}
//             sx={buttonStyles(showCalendar)}
//           >
//             Calendar View
//             {tasks.length > 0 && (
//               <Box
//                 component="span"
//                 sx={{
//                   ml: 'auto',
//                   backgroundColor: '#3b82f6',
//                   color: 'white',
//                   borderRadius: '50%',
//                   width: 20,
//                   height: 20,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '0.75rem',
//                   fontWeight: 'bold'
//                 }}
//               >
//                 {tasks.length}
//               </Box>
//             )}
//           </Button>

//           <Button
//             startIcon={<ReportsIcon />}
//             onClick={() => navigate('/archived')}
//             sx={buttonStyles()}
//           >
//             Archived
//           </Button>
//         </Box>

//         {/* Footer */}
//         <Box sx={{
//           p: 3,
//           mt: 'auto',
//           borderTop: '1px solid #334155'
//         }}>
//           <Typography variant="caption" sx={{
//             color: '#64748b',
//             display: 'block',
//             textAlign: 'center'
//           }}>
//             To-Do Tracker v1.0
//           </Typography>
//         </Box>
//       </Box>

//       {/* Calendar Modal */}
//       {showCalendar && (
//         <>
//           {/* Enhanced Backdrop */}
//           <Box
//             sx={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: 'rgba(0, 0, 0, 0.4)',
//               zIndex: 1300,
//               backdropFilter: 'blur(3px)',
//               transition: 'all 0.3s ease-in-out',
//             }}
//             onClick={handleCloseCalendar}
//           />

//           {/* Calendar Card - Responsive positioning */}
//           <Box
//             sx={{
//               position: 'fixed',
//               left: { xs: '50%', md: 280 }, // Center on mobile, next to sidebar on desktop
//               top: '50%',
//               transform: { 
//                 xs: 'translate(-50%, -50%)', 
//                 md: 'translateY(-50%)' 
//               },
//               width: { xs: '95vw', sm: '90vw', md: 450 },
//               maxWidth: 500,
//               maxHeight: '90vh',
//               backgroundColor: '#ffffff',
//               borderRadius: 3,
//               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
//               zIndex: 1400,
//               overflow: 'hidden',
//               border: '1px solid #e5e7eb',
//               animation: 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
//               '@keyframes slideIn': {
//                 '0%': {
//                   opacity: 0,
//                   transform: {
//                     xs: 'translate(-50%, -50%) scale(0.9)',
//                     md: 'translateY(-50%) translateX(-30px) scale(0.9)'
//                   },
//                 },
//                 '100%': {
//                   opacity: 1,
//                   transform: {
//                     xs: 'translate(-50%, -50%) scale(1)',
//                     md: 'translateY(-50%) translateX(0) scale(1)'
//                   },
//                 },
//               },
//             }}
//           >
//             {/* Enhanced Close button */}
//             <IconButton
//               onClick={handleCloseCalendar}
//               sx={{
//                 position: 'absolute',
//                 right: 12,
//                 top: 12,
//                 zIndex: 1500,
//                 backgroundColor: 'rgba(255, 255, 255, 0.95)',
//                 backdropFilter: 'blur(8px)',
//                 color: '#6b7280',
//                 width: 32,
//                 height: 32,
//                 boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//                 border: '1px solid rgba(0, 0, 0, 0.05)',
//                 '&:hover': {
//                   backgroundColor: 'rgba(239, 68, 68, 0.1)',
//                   color: '#ef4444',
//                   transform: 'scale(1.05)',
//                   boxShadow: '0 6px 12px -2px rgba(0, 0, 0, 0.15)',
//                 },
//                 transition: 'all 0.2s ease-in-out'
//               }}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>

//             {/* Calendar Component with proper styling */}
//             <Box
//               sx={{
//                 '& .max-w-full': {
//                   maxWidth: '100%',
//                 },
//                 '& .overflow-hidden': {
//                   overflow: 'hidden',
//                 },
//                 // Ensure proper scrolling for calendar content
//                 maxHeight: '90vh',
//                 overflowY: 'auto',
//                 '&::-webkit-scrollbar': {
//                   width: 6,
//                 },
//                 '&::-webkit-scrollbar-track': {
//                   backgroundColor: '#f1f5f9',
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                   backgroundColor: '#cbd5e1',
//                   borderRadius: 3,
//                   '&:hover': {
//                     backgroundColor: '#94a3b8',
//                   },
//                 },
//               }}
//             >
//               <Calender tasks={tasks} />
//             </Box>
//           </Box>
//         </>
//       )}
//     </>
//   );
// };

// // Enhanced button styles with better active state
// const buttonStyles = (active = false) => ({
//   color: active ? '#e2e8f0' : '#94a3b8',
//   backgroundColor: active ? '#334155' : 'transparent',
//   justifyContent: 'flex-start',
//   '&:hover': {
//     backgroundColor: '#334155',
//     color: '#e2e8f0',
//     transform: 'translateX(4px)'
//   },
//   borderRadius: 2,
//   p: 1.5,
//   textTransform: 'none',
//   fontSize: '0.95rem',
//   fontWeight: active ? 600 : 500,
//   transition: 'all 0.2s ease',
//   borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
//   marginLeft: active ? '-3px' : 0,
//   position: 'relative',
//   '&::after': active ? {
//     content: '""',
//     position: 'absolute',
//     right: 8,
//     top: '50%',
//     transform: 'translateY(-50%)',
//     width: 6,
//     height: 6,
//     backgroundColor: '#3b82f6',
//     borderRadius: '50%',
//   } : {}
// });

// export default Sidebar;
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  Assessment as ReportsIcon,
  Home as HomeIcon,
  Task as TaskIcon,
  Settings as SettingsIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import Calendar from './Calender'; // Your existing TaskCalendar component

const SideBar = ({ 
  onClose, 
  tasks = [], 
  archivedTasks = [], 
  onTasksUpdate 
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const navigate = useNavigate();

  // Handler to toggle calendar visibility
  const handleCalendarToggle = () => {
    setShowCalendar(prev => !prev);
    // Close archived if it's open
    if (showArchived) {
      setShowArchived(false);
    }
  };

  // Handler to close calendar
  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  // Handler for archived toggle
  const handleArchivedToggle = () => {
    setShowArchived(prev => !prev);
    // Close calendar if it's open
    if (showCalendar) {
      setShowCalendar(false);
    }
  };

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
          overflow: 'auto'
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

        {/* Task Statistics Section */}
        <Box sx={{ px: 3, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ 
            color: '#94a3b8', 
            mb: 2,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            fontSize: '0.75rem'
          }}>
            Quick Stats
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1.5,
            backgroundColor: '#0f172a',
            borderRadius: 2,
            p: 2,
            border: '1px solid #334155'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                Total Tasks:
              </Typography>
              <Box sx={{
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '12px',
                px: 1.5,
                py: 0.5,
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {tasks.length}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                Pending:
              </Typography>
              <Box sx={{
                backgroundColor: '#f59e0b',
                color: 'white',
                borderRadius: '12px',
                px: 1.5,
                py: 0.5,
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {tasks.filter(task => 
                  task.taskStatus !== 'Completed' && 
                  task.taskStatus !== 'Deleted' && 
                  task.taskStatus !== 'Archived'
                ).length}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                Completed:
              </Typography>
              <Box sx={{
                backgroundColor: '#10b981',
                color: 'white',
                borderRadius: '12px',
                px: 1.5,
                py: 0.5,
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {tasks.filter(task => task.taskStatus === 'Completed').length}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                Archived:
              </Typography>
              <Box sx={{
                backgroundColor: '#6b7280',
                color: 'white',
                borderRadius: '12px',
                px: 1.5,
                py: 0.5,
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {tasks.filter(task => task.taskStatus === 'Archived').length}
              </Box>
            </Box>
          </Box>
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
            onClick={() => navigate('/')}
          >
            Home
          </Button>

          <Button
            startIcon={<CalendarIcon />}
            onClick={handleCalendarToggle}
            sx={buttonStyles(showCalendar)}
          >
            Calendar View
            {tasks.length > 0 && (
              <Box
                component="span"
                sx={{
                  ml: 'auto',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}
              >
                {tasks.length}
              </Box>
            )}
          </Button>

          <Button
            startIcon={<ReportsIcon />}
            onClick={() => navigate('/archived')}
            sx={buttonStyles(showArchived)}
          >
            Archived
            {archivedTasks.length > 0 && (
              <Box
                component="span"
                sx={{
                  ml: 'auto',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}
              >
                {archivedTasks.length}
              </Box>
            )}
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

      {/* Calendar Modal */}
      {showCalendar && (
        <>
          {/* Enhanced Backdrop */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1300,
              backdropFilter: 'blur(3px)',
              transition: 'all 0.3s ease-in-out',
            }}
            onClick={handleCloseCalendar}
          />

          {/* Calendar Card - Responsive positioning */}
          <Box
            sx={{
              position: 'fixed',
              left: { xs: '50%', md: 280 }, // Center on mobile, next to sidebar on desktop
              top: '50%',
              transform: { 
                xs: 'translate(-50%, -50%)', 
                md: 'translateY(-50%)' 
              },
              width: { xs: '95vw', sm: '90vw', md: 450 },
              maxWidth: 500,
              maxHeight: '90vh',
              backgroundColor: '#ffffff',
              borderRadius: 3,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              zIndex: 1400,
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              animation: 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              '@keyframes slideIn': {
                '0%': {
                  opacity: 0,
                  transform: {
                    xs: 'translate(-50%, -50%) scale(0.9)',
                    md: 'translateY(-50%) translateX(-30px) scale(0.9)'
                  },
                },
                '100%': {
                  opacity: 1,
                  transform: {
                    xs: 'translate(-50%, -50%) scale(1)',
                    md: 'translateY(-50%) translateX(0) scale(1)'
                  },
                },
              },
            }}
          >
            {/* Enhanced Close button */}
            <IconButton
              onClick={handleCloseCalendar}
              sx={{
                position: 'absolute',
                right: 12,
                top: 12,
                zIndex: 1500,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                color: '#6b7280',
                width: 32,
                height: 32,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 12px -2px rgba(0, 0, 0, 0.15)',
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            {/* Calendar Component with proper styling */}
            <Box
              sx={{
                '& .max-w-full': {
                  maxWidth: '100%',
                },
                '& .overflow-hidden': {
                  overflow: 'hidden',
                },
                // Ensure proper scrolling for calendar content
                maxHeight: '90vh',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: 6,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f5f9',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#cbd5e1',
                  borderRadius: 3,
                  '&:hover': {
                    backgroundColor: '#94a3b8',
                  },
                },
              }}
            >
              <Calendar 
                tasks={tasks} 
                onTasksUpdate={onTasksUpdate}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

// Enhanced button styles with better active state
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

export default SideBar;