import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Slide,
  useScrollTrigger,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Fade,
  Collapse,
  useMediaQuery,
  useTheme,
  Divider,
  Button,
  Tooltip,
  Container
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Assignment as TaskIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CompletedIcon,
  RadioButtonUnchecked as TodoIcon,
  PlayCircle as InProgressIcon,
  Menu as MenuIcon
} from "@mui/icons-material";

const Header = ({ 
  tasks = [], 
  onSearchResults, 
  onTaskSelect,
  searchPlaceholder = "Search tasks...",
  showFilters = true,
  isMobile: isMobileProp,
  onMenuClick
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')) || isMobileProp;
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Header scroll logic
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const trigger = useScrollTrigger({ threshold: 100 });

  // Search functionality state
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Refs
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Filter options
  const filterOptions = [
    { id: 'todo', label: 'To Do', icon: <TodoIcon />, color: '#3b82f6' },
    { id: 'inprogress', label: 'In Progress', icon: <InProgressIcon />, color: '#f59e0b' },
    { id: 'completed', label: 'Completed', icon: <CompletedIcon />, color: '#10b981' },
  ];

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTop = currentScrollPos < 10;
      setVisible(isScrollingUp || isAtTop);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTasks([]);
      setShowResults(false);
      return;
    }

    const filtered = tasks.filter(task => {
      const matchesSearch = 
        task.taskTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskStatus?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters = activeFilters.length === 0 || 
        activeFilters.some(filter => {
          switch (filter) {
            case 'todo':
              return task.taskStatus === 'To Do';
            case 'inprogress':
              return task.taskStatus === 'In Progress';
            case 'completed':
              return task.taskStatus === 'Completed';
            default:
              return true;
          }
        });

      return matchesSearch && matchesFilters;
    });

    setFilteredTasks(filtered);
    setShowResults(filtered.length > 0 || searchTerm.length > 0);
    
    if (onSearchResults) {
      onSearchResults(filtered);
    }
  }, [searchTerm, tasks, activeFilters, onSearchResults]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
        if (isMobile && searchTerm === '') {
          setIsSearchExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, searchTerm]);

  // Search handlers
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    } else {
      setSearchTerm('');
      setShowResults(false);
      setActiveFilters([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTaskSelect = (task) => {
    if (onTaskSelect) {
      onTaskSelect(task);
    }
    setShowResults(false);
    if (isMobile) {
      setIsSearchExpanded(false);
    }
  };

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const clearSearch = () => {
    setSearchTerm('');
    setActiveFilters([]);
    setShowResults(false);
    searchInputRef.current?.focus();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'To Do':
        return <TodoIcon sx={{ color: '#3b82f6', fontSize: '1.2rem' }} />;
      case 'In Progress':
        return <InProgressIcon sx={{ color: '#f59e0b', fontSize: '1.2rem' }} />;
      case 'Completed':
        return <CompletedIcon sx={{ color: '#10b981', fontSize: '1.2rem' }} />;
      default:
        return <TaskIcon sx={{ color: '#64748b', fontSize: '1.2rem' }} />;
    }
  };

  return (
    <Slide appear={false} direction="down" in={visible}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(102, 126, 234, 0.95)",
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
          transition: "all 0.3s ease-in-out",
          py: { xs: 1.5, sm: 2 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="xl">
          {/* Header Content */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mb: (isSearchExpanded && isMobile) || !isMobile ? 2 : 0,
            }}
          >
            {/* Brand/Title with Menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
              {/* Mobile Menu Button */}
              {isMobile && onMenuClick && (
                <IconButton
                  onClick={onMenuClick}
                  sx={{
                    color: "white",
                    mr: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    '&:hover': {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  letterSpacing: "0.5px",
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                🎯 To-Do Tracker
              </Typography>
              {!isMobile && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.85)",
                    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    ml: 1,
                  }}
                >
                  Manage your tasks efficiently
                </Typography>
              )}
            </Box>

            {/* Mobile Search Toggle - Always show on mobile */}
            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={isSearchExpanded ? "Close search" : "Search tasks"} arrow>
                  <IconButton
                    onClick={toggleSearch}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      width: 44,
                      height: 44,
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isSearchExpanded ? (
                      <CloseIcon sx={{ fontSize: "1.3rem" }} />
                    ) : (
                      <SearchIcon sx={{ fontSize: "1.3rem" }} />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>

          {/* Search Bar */}
          <Box
            ref={searchContainerRef}
            sx={{
              position: "relative",
              width: "100%",
            }}
          >
            <Collapse in={isSearchExpanded || !isMobile} timeout={300}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: showResults 
                    ? "0 8px 32px rgba(0, 0, 0, 0.15)" 
                    : "0 4px 20px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Search Input */}
                <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
                  <TextField
                    ref={searchInputRef}
                    fullWidth
                    variant="outlined"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    size={isSmallMobile ? "small" : "medium"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ 
                            color: '#667eea',
                            fontSize: { xs: '1.2rem', sm: '1.4rem' }
                          }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {searchTerm && (
                              <Tooltip title="Clear search" arrow>
                                <IconButton
                                  size="small"
                                  onClick={clearSearch}
                                  sx={{
                                    color: '#64748b',
                                    '&:hover': { color: '#ef4444' }
                                  }}
                                >
                                  <ClearIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                              </Tooltip>
                            )}
                            {showFilters && (
                              <Tooltip title="Toggle filters" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                                  sx={{
                                    color: activeFilters.length > 0 ? '#667eea' : '#64748b',
                                    backgroundColor: activeFilters.length > 0 ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                                    '&:hover': { 
                                      color: '#667eea',
                                      backgroundColor: 'rgba(102, 126, 234, 0.1)'
                                    }
                                  }}
                                >
                                  <FilterIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                              </Tooltip>
                            )}
                            {isMobile && isSearchExpanded && (
                              <Tooltip title="Close search" arrow>
                                <IconButton
                                  size="small"
                                  onClick={toggleSearch}
                                  sx={{
                                    color: '#64748b',
                                    '&:hover': { color: '#ef4444' }
                                  }}
                                >
                                  <CloseIcon sx={{ fontSize: '1.1rem' }} />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </InputAdornment>
                      ),
                      sx: {
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none'
                        },
                        '& .MuiInputBase-input': {
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          py: { xs: 1, sm: 1.5 }
                        }
                      }
                    }}
                  />
                </Box>

                {/* Filters Panel */}
                {showFilters && (
                  <Collapse in={showFiltersPanel}>
                    <Box sx={{ 
                      px: { xs: 2, sm: 2.5 }, 
                      pb: { xs: 1.5, sm: 2 },
                      borderTop: '1px solid rgba(102, 126, 234, 0.1)'
                    }}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#667eea', 
                          mb: 1, 
                          display: 'block',
                          fontWeight: 600
                        }}
                      >
                        Filter by status:
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1, 
                        flexWrap: 'wrap',
                        alignItems: 'center'
                      }}>
                        {filterOptions.map((filter) => (
                          <Chip
                            key={filter.id}
                            icon={filter.icon}
                            label={filter.label}
                            onClick={() => toggleFilter(filter.id)}
                            variant={activeFilters.includes(filter.id) ? 'filled' : 'outlined'}
                            size={isSmallMobile ? "small" : "medium"}
                            sx={{
                              backgroundColor: activeFilters.includes(filter.id) 
                                ? filter.color 
                                : 'transparent',
                              color: activeFilters.includes(filter.id) 
                                ? 'white' 
                                : filter.color,
                              borderColor: filter.color,
                              '&:hover': {
                                backgroundColor: activeFilters.includes(filter.id)
                                  ? filter.color
                                  : `${filter.color}15`,
                              },
                              '& .MuiChip-icon': {
                                color: activeFilters.includes(filter.id) 
                                  ? 'white' 
                                  : filter.color,
                              },
                              transition: 'all 0.2s ease'
                            }}
                          />
                        ))}
                        {activeFilters.length > 0 && (
                          <Button
                            size="small"
                            onClick={() => setActiveFilters([])}
                            sx={{
                              ml: 1,
                              color: '#667eea',
                              fontSize: '0.75rem',
                              textTransform: 'none',
                              '&:hover': { color: '#ef4444' }
                            }}
                          >
                            Clear filters
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Collapse>
                )}
              </Paper>
            </Collapse>

            {/* Search Results */}
            <Fade in={showResults && (isSearchExpanded || !isMobile)}>
              <Paper
                elevation={8}
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  mt: 1,
                  maxHeight: { xs: '60vh', sm: '50vh' },
                  overflow: 'auto',
                  zIndex: 1000,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)'
                }}
              >
                {filteredTasks.length > 0 ? (
                  <List sx={{ p: 0 }}>
                    {filteredTasks.map((task, index) => (
                      <React.Fragment key={task.id}>
                        <ListItem
                          button
                          onClick={() => handleTaskSelect(task)}
                          sx={{
                            py: { xs: 1.5, sm: 2 },
                            px: { xs: 2, sm: 2.5 },
                            '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.05)',
                            },
                            cursor: 'pointer'
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {getStatusIcon(task.taskStatus)}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: 500,
                                  fontSize: { xs: '0.9rem', sm: '1rem' },
                                  color: '#1e293b'
                                }}
                              >
                                {task.taskTitle}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: '#64748b',
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                    mb: 0.5,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                  }}
                                >
                                  {task.taskDescription}
                                </Typography>
                                <Chip
                                  label={task.taskStatus}
                                  size="small"
                                  sx={{
                                    backgroundColor: task.taskStatus === 'Completed' 
                                      ? '#dcfce7' 
                                      : task.taskStatus === 'In Progress' 
                                        ? '#fef3c7' 
                                        : '#dbeafe',
                                    color: task.taskStatus === 'Completed' 
                                      ? '#166534' 
                                      : task.taskStatus === 'In Progress' 
                                        ? '#92400e' 
                                        : '#1e40af',
                                    fontSize: '0.7rem',
                                    height: 20
                                  }}
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < filteredTasks.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                ) : searchTerm ? (
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: { xs: 3, sm: 4 },
                    px: { xs: 2, sm: 3 }
                  }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#64748b',
                        mb: 1,
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                      }}
                    >
                      No tasks found
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#94a3b8',
                        fontSize: { xs: '0.8rem', sm: '0.875rem' }
                      }}
                    >
                      Try adjusting your search terms or filters
                    </Typography>
                  </Box>
                ) : null}
              </Paper>
            </Fade>
          </Box>
        </Container>
      </Box>
    </Slide>
  );
};

export default Header;