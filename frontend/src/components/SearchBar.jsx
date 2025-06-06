import React, { useState, useEffect, useMemo } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Autocomplete,
  Chip,
  Paper,
  Typography,
  Divider,
  Menu,
  MenuItem,
  FormControl,
  Select,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  Task as TaskIcon,
  Schedule as ScheduleIcon,
  Flag as FlagIcon
} from '@mui/icons-material';

const SearchBar = ({
  tasks = [],
  onSearchResults,
  onTaskSelect,
  placeholder = "Search tasks...",
  showFilters = true,
  isMobile = false
}) => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Memoized filtered results
  const filteredTasks = useMemo(() => {
    if (!searchTerm.trim() && Object.values(selectedFilters).every(filter => filter === 'all')) {
      return tasks;
    }

    return tasks.filter(task => {
      // Text search
      const matchesSearch = !searchTerm.trim() || 
        task.taskTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskCategory?.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = selectedFilters.status === 'all' || 
        task.taskStatus === selectedFilters.status;

      // Priority filter
      const matchesPriority = selectedFilters.priority === 'all' || 
        task.taskPriority === selectedFilters.priority;

      // Category filter
      const matchesCategory = selectedFilters.category === 'all' || 
        task.taskCategory === selectedFilters.category;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, searchTerm, selectedFilters]);

  // Get unique values for filters
  const uniqueStatuses = [...new Set(tasks.map(task => task.taskStatus).filter(Boolean))];
  const uniquePriorities = [...new Set(tasks.map(task => task.taskPriority).filter(Boolean))];
  const uniqueCategories = [...new Set(tasks.map(task => task.taskCategory).filter(Boolean))];

  // Effects
  useEffect(() => {
    if (onSearchResults) {
      onSearchResults(filteredTasks);
    }
  }, [filteredTasks, onSearchResults]);

  // Event handlers
  const handleSearchChange = (event, value) => {
    const newSearchTerm = value || event?.target?.value || '';
    setSearchTerm(newSearchTerm);
  };

  const handleTaskSelect = (event, task) => {
    if (task && onTaskSelect) {
      onTaskSelect(task);
      setSearchTerm('');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedFilters({
      status: 'all',
      priority: 'all',
      category: 'all'
    });
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getTaskOptionLabel = (task) => {
    if (!task || typeof task === 'string') return task || '';
    return task.taskTitle || '';
  };

  const hasActiveFilters = Object.values(selectedFilters).some(filter => filter !== 'all');

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: { xs: 1, sm: 2 },
      width: '100%'
    }}>
      {/* Main Search Autocomplete */}
      <Autocomplete
        freeSolo
        fullWidth
        options={filteredTasks}
        getOptionLabel={getTaskOptionLabel}
        value={searchTerm}
        onInputChange={handleSearchChange}
        onChange={handleTaskSelect}
        filterOptions={(options, { inputValue }) => {
          if (!inputValue.trim()) return options.slice(0, 5);
          return options
            .filter(task => 
              task.taskTitle?.toLowerCase().includes(inputValue.toLowerCase()) ||
              task.taskDescription?.toLowerCase().includes(inputValue.toLowerCase())
            )
            .slice(0, 8);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            size={isSmallMobile ? "small" : "medium"}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ 
                    color: isSearchFocused ? '#3b82f6' : '#64748b',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }} />
                </InputAdornment>
              ),
              endAdornment: (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {(searchTerm || hasActiveFilters) && (
                    <IconButton
                      size="small"
                      onClick={handleClearSearch}
                      sx={{ 
                        color: '#64748b',
                        '&:hover': { color: '#ef4444', backgroundColor: '#fef2f2' }
                      }}
                    >
          
                    </IconButton>
                  )}
                  {params.InputProps.endAdornment}
                </Box>
              ),
              sx: {
                backgroundColor: '#f8fafc',
                borderRadius: { xs: 2, sm: 3 },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e2e8f0'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#cbd5e1'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3b82f6',
                  borderWidth: 2
                },
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }
            }}
          />
        )}
        renderOption={(props, task) => (
          <Box
            component="li"
            {...props}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: '#f1f5f9'
              }
            }}
          >
            <TaskIcon sx={{ color: '#64748b', fontSize: '1.1rem' }} />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: '#1e293b',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {task.taskTitle}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Chip
                  label={task.taskStatus}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    backgroundColor: task.taskStatus === 'Completed' ? '#dcfce7' : 
                                   task.taskStatus === 'In Progress' ? '#fef3c7' : '#f1f5f9',
                    color: task.taskStatus === 'Completed' ? '#166534' : 
                           task.taskStatus === 'In Progress' ? '#92400e' : '#64748b'
                  }}
                />
                {task.taskPriority && (
                  <Chip
                    label={task.taskPriority}
                    size="small"
                    icon={<FlagIcon sx={{ fontSize: '0.7rem' }} />}
                    sx={{
                      height: 20,
                      fontSize: '0.7rem',
                      backgroundColor: task.taskPriority === 'High' ? '#fecaca' : 
                                     task.taskPriority === 'Medium' ? '#fed7aa' : '#e0e7ff',
                      color: task.taskPriority === 'High' ? '#dc2626' : 
                             task.taskPriority === 'Medium' ? '#ea580c' : '#4338ca'
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        )}
        PaperComponent={({ children, ...props }) => (
          <Paper
            {...props}
            sx={{
              mt: 1,
              borderRadius: 2,
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              maxHeight: 300,
              overflow: 'auto'
            }}
          >
            {children}
          </Paper>
        )}
      />

      {/* Filter Button */}
      {showFilters && !isSmallMobile && (
        <IconButton
          onClick={handleFilterClick}
          sx={{
            color: hasActiveFilters ? '#3b82f6' : '#64748b',
            backgroundColor: hasActiveFilters ? '#eff6ff' : '#f8fafc',
            borderRadius: 2,
            border: hasActiveFilters ? '1px solid #3b82f6' : '1px solid #e2e8f0',
            '&:hover': {
              backgroundColor: hasActiveFilters ? '#dbeafe' : '#e2e8f0',
              color: '#3b82f6'
            }
          }}
        >
          <FilterListIcon />
        </IconButton>
      )}

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0',
            minWidth: 200
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: '#1e293b' }}>
            Filter Tasks
          </Typography>

          {/* Status Filter */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: '#64748b', mb: 1, display: 'block' }}>
              Status
            </Typography>
            <FormControl size="small" fullWidth>
              <Select
                value={selectedFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                sx={{ borderRadius: 1 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                {uniqueStatuses.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Priority Filter */}
          {uniquePriorities.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#64748b', mb: 1, display: 'block' }}>
                Priority
              </Typography>
              <FormControl size="small" fullWidth>
                <Select
                  value={selectedFilters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="all">All Priorities</MenuItem>
                  {uniquePriorities.map(priority => (
                    <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          {/* Category Filter */}
          {uniqueCategories.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#64748b', mb: 1, display: 'block' }}>
                Category
              </Typography>
              <FormControl size="small" fullWidth>
                <Select
                  value={selectedFilters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {uniqueCategories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <Divider sx={{ my: 1 }} />
          
          {/* Clear Filters */}
          <MenuItem 
            onClick={handleClearSearch}
            sx={{ 
              justifyContent: 'center',
              color: '#ef4444',
              '&:hover': { backgroundColor: '#fef2f2' }
            }}
          >
            Clear All Filters
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

export default SearchBar;