import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  Fade,
  Collapse,
  useMediaQuery,
  useTheme,
  Divider,
  Button,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Assignment as TaskIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CompletedIcon,
  RadioButtonUnchecked as TodoIcon,
  PlayCircle as InProgressIcon
} from '@mui/icons-material';

const SearchBar = ({ 
  tasks = [], 
  onSearchResults, 
  onTaskSelect,
  placeholder = "Search tasks...",
  showFilters = true 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [showResults, setShowResults] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Refs
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Filter options
  const filterOptions = [
    { id: 'todo', label: 'To Do', icon: <TodoIcon />, color: '#3b82f6' },
    { id: 'inprogress', label: 'In Progress', icon: <InProgressIcon />, color: '#f59e0b' },
    { id: 'completed', label: 'Completed', icon: <CompletedIcon />, color: '#10b981' },
  ];

  // Load recent searches from localStorage (if available)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('taskflow_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Could not load recent searches:', error);
    }
  }, []);

  // Handle search functionality
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
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, searchTerm]);

  // Toggle search expansion
  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    } else {
      setSearchTerm('');
      setShowResults(false);
      setActiveFilters([]);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle task selection
  const handleTaskSelect = (task) => {
    if (onTaskSelect) {
      onTaskSelect(task);
    }
    
    // Add to recent searches
    const newRecentSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    try {
      localStorage.setItem('taskflow_recent_searches', JSON.stringify(newRecentSearches));
    } catch (error) {
      console.warn('Could not save recent searches:', error);
    }

    setShowResults(false);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  // Handle filter toggle
  const toggleFilter = (filterId) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setActiveFilters([]);
    setShowResults(false);
    searchInputRef.current?.focus();
  };

  // Get status icon
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
    <Box 
      ref={searchContainerRef}
      sx={{ 
        position: 'relative',
        width: '100%',
        maxWidth: { xs: '100%', sm: 500, md: 600, lg: 700 },
        mx: 'auto'
      }}
    >
      {/* Mobile Toggle Button */}
      {isMobile && !isExpanded && (
        <Tooltip title="Search tasks" arrow>
          <IconButton
            onClick={toggleSearch}
            sx={{
              backgroundColor: '#3b82f6',
              color: 'white',
              width: { xs: 48, sm: 52 },
              height: { xs: 48, sm: 52 },
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              '&:hover': {
                backgroundColor: '#2563eb',
                transform: 'scale(1.05)',
                boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
              },
              transition: 'all 0.2s ease'
            }}
          >
            <SearchIcon sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />
          </IconButton>
        </Tooltip>
      )}

      {/* Search Input */}
      <Collapse in={isExpanded} timeout={300}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: { xs: 2, sm: 3, md: 4 },
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            border: '2px solid',
            borderColor: showResults ? '#3b82f6' : '#e2e8f0',
            boxShadow: showResults 
              ? '0 8px 25px rgba(59, 130, 246, 0.15)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Main Search Input */}
          <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
            <TextField
              ref={searchInputRef}
              fullWidth
              variant="outlined"
              placeholder={placeholder}
              value={searchTerm}
              onChange={handleSearchChange}
              size={isSmallMobile ? "small" : "medium"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ 
                      color: '#64748b',
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
                              color: activeFilters.length > 0 ? '#3b82f6' : '#64748b',
                              backgroundColor: activeFilters.length > 0 ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                              '&:hover': { 
                                color: '#3b82f6',
                                backgroundColor: 'rgba(59, 130, 246, 0.1)'
                              }
                            }}
                          >
                            <FilterIcon sx={{ fontSize: '1.1rem' }} />
                          </IconButton>
                        </Tooltip>
                      )}
                      {isMobile && (
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
                borderTop: '1px solid #e2e8f0'
              }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#64748b', 
                    mb: 1, 
                    display: 'block',
                    fontWeight: 500
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
                        color: '#64748b',
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
      <Fade in={showResults && isExpanded}>
        <Paper
          elevation={4}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            maxHeight: { xs: '70vh', sm: '60vh', md: '50vh' },
            overflow: 'auto',
            zIndex: 1000,
            borderRadius: { xs: 2, sm: 3 },
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
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
                        backgroundColor: '#f8fafc',
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
  );
};

export default SearchBar;