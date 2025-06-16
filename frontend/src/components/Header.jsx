import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
  Divider,
  // useMediaQuery,
  Container,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import {
  Settings as SettingsIcon,
  HelpOutline as HelpOutlineIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import SearchBar from './SearchBar';
// import Sidebar from './SideBar';
import { useNavigate } from 'react-router';

export const Header = ({
  tasks = [],
  onSearchResults,
  onTaskSelect,
  onClearSearch,
  searchPlaceholder = "Search tasks...",
  showFilters = true,
  isMobile = false,
  onMenuClick
}) => {
  const theme = useTheme();
  // const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    handleMenuClose();
    // console.log("Logged out");
    localStorage.removeItem("token");
    navigate("/");
    // TODO: Add your logout logic here (e.g., clear token, redirect)
  };

  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const toggleDrawer = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };
  // const activeTasks = tasks.filter(task => task.taskStatus !== "Archived");

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar
          sx={{
            minHeight: { xs: 56, sm: 64, md: 70 },
            px: { xs: 0, sm: 1 },
            gap: { xs: 1, sm: 2 },
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >

          <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 1, sm: 3 } }}>
            {/* Mobile Menu Button */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              sx={{
                mr: { xs: 1, sm: 2 },
                color: '#1e293b',
                backgroundColor: '#f8fafc',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#e2e8f0'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* Logo/Brand */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: '#1e293b',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Dashboard
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: '#1e293b',
                fontSize: '1rem',
                display: { xs: 'block', sm: 'none' }
              }}
            >
              📋
            </Typography>
          </Box>

          {/* Search Bar - Takes remaining space */}
          <Box sx={{ flexGrow: 1, maxWidth: { xs: '100%', md: 600 } }}>
            <SearchBar
              tasks={tasks}
              onSearchResults={onSearchResults}
              onTaskSelect={onTaskSelect}
              placeholder={searchPlaceholder}
              showFilters={showFilters}
              isMobile={isMobile}
              onClearSearch={onClearSearch}
            />
          </Box>

          {/* Right side actions */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
            ml: { xs: 1, sm: 2 }
          }}>
            {/* Notifications - Hidden on small mobile */}
            <IconButton
              color="inherit"
              sx={{
                color: '#64748b',
                display: { xs: 'none', sm: 'flex' },
                backgroundColor: '#f8fafc',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#e2e8f0',
                  color: '#1e293b'
                }
              }}
            >
              <NotificationsIcon />
            </IconButton>

            {/* Profile */}
            <>
              <IconButton
                color="inherit"
                onClick={handleProfileClick}
                sx={{
                  color: '#64748b',
                  backgroundColor: '#f8fafc',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#e2e8f0',
                    color: '#1e293b'
                  }
                }}
              >
                <AccountCircleIcon />
              </IconButton>

             {/* Enhanced Profile Dropdown Menu */}
<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  PaperProps={{
    sx: {
      mt: 1.5,
      minWidth: 200,
      borderRadius: 2,
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      border: '1px solid rgba(0,0,0,0.08)',
      '& .MuiMenuItem-root': {
        px: 3,
        py: 1.5,
        borderRadius: 1,
        mx: 1,
        my: 0.5,
        '&:hover': {
          backgroundColor: '#f1f5f9',
        },
        '&.Mui-disabled': {
          opacity: 1,
          backgroundColor: 'transparent',
        }
      }
    }
  }}
>
  {/* User Profile Section
  {currentUser?.userName && (
    <>
      <MenuItem disabled sx={{ 
        flexDirection: 'column', 
        alignItems: 'flex-start !important',
        '&:hover': { backgroundColor: 'transparent !important' }
      }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 'bold',
            color: '#1e293b',
            lineHeight: 1.2
          }}
        >
          {currentUser.userName}
        </Typography>
        {currentUser.email && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#64748b',
              mt: 0.5,
              fontSize: '0.75rem'
            }}
          >
            {currentUser.email}
          </Typography>
        )}
      </MenuItem>
      <Divider sx={{ my: 1 }} />
    </>
  )} */}

  {/* Profile Menu Item */}
  <MenuItem 
    onClick={() => {
      handleMenuClose();
      // Navigate to profile page
      // navigate('/profile');
    }}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5
    }}
  >
    <AccountCircleIcon sx={{ fontSize: 20, color: '#64748b' }} />
    <Typography variant="body2">My Profile</Typography>
  </MenuItem>

  {/* Settings Menu Item
  <MenuItem 
    onClick={() => {
      handleMenuClose();
      // Navigate to settings page
      // navigate('/settings');
    }}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5
    }}
  >
    <SettingsIcon sx={{ fontSize: 20, color: '#64748b' }} />
    <Typography variant="body2">Settings</Typography>
  </MenuItem>

  {/* Help & Support Menu Item 
  <MenuItem 
    onClick={() => {
      handleMenuClose();
      // Navigate to help page or open help modal
      // navigate('/help');
    }}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5
    }}
  >
    <HelpOutlineIcon sx={{ fontSize: 20, color: '#64748b' }} />
    <Typography variant="body2">Help & Support</Typography>
  </MenuItem>

  <Divider sx={{ my: 1 }} /> */}

  {/* Logout Menu Item */}
  <MenuItem 
    onClick={handleLogout}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      color: '#dc2626',
      '&:hover': {
        backgroundColor: '#fef2f2 !important',
        color: '#dc2626'
      }
    }}
  >
    <LogoutIcon sx={{ fontSize: 20 }} />
    <Typography variant="body2">Logout</Typography>
  </MenuItem>
</Menu>
            </>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;