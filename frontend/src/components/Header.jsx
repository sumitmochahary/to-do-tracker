import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme,
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
import SearchBar from './SearchBar';
// import Sidebar from './SideBar';
import { useNavigate } from 'react-router';

export const Header = ({
  tasks = [],
  onSearchResults,
  onTaskSelect,
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
    console.log("Logged out");
    localStorage.removeItem("token");
    navigate("/");
    // TODO: Add your logout logic here (e.g., clear token, redirect)
  };

  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const toggleDrawer = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };

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

              {/* Profile Dropdown Menu */}
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
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;