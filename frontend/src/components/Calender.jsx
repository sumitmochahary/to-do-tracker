import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const Calender = ({ tasks = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample tasks for demonstration if none provided
  const sampleTasks = tasks.length === 0 ? [
    {
      id: 1,
      title: 'Complete Project Proposal',
      description: 'Finalize the Q4 project proposal document',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'high',
      category: 'Work'
    },
    {
      id: 2,
      title: 'Team Meeting',
      description: 'Weekly standup with development team',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      priority: 'medium',
      category: 'Meeting'
    },
    {
      id: 3,
      title: 'Code Review',
      description: 'Review pull requests from team members',
      dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      priority: 'low',
      category: 'Development'
    },
    {
      id: 4,
      title: 'Client Presentation',
      description: 'Present quarterly results to client',
      dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      priority: 'high',
      category: 'Client'
    }
  ] : tasks;

  // Helper functions
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sampleTasks.filter(task => task.dueDate === dateStr);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-3 h-3" />;
      case 'medium': return <Clock className="w-3 h-3" />;
      case 'low': return <CheckCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  // Navigation functions
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Header with weekdays
    weekdays.forEach(day => {
      days.push(
        <div key={day} className="p-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {day}
        </div>
      );
    });

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 h-24 border border-gray-100"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const tasksForDay = getTasksForDate(date);
      const isSelected = isSameDay(date, selectedDate);
      const isToday = isSameDay(date, new Date());

      const hasHighPriority = tasksForDay.some(task => task.priority === 'high');
      const hasMediumPriority = tasksForDay.some(task => task.priority === 'medium');

      let dayClass = 'p-1 h-24 border border-gray-100 cursor-pointer transition-colors duration-150 hover:bg-blue-50 relative overflow-hidden';
      
      if (isSelected) {
        dayClass += ' bg-blue-50 border-blue-300 ring-1 ring-blue-200';
      } else if (isToday) {
        dayClass += ' bg-blue-25 border-blue-200';
      }

      days.push(
        <div
          key={day}
          className={dayClass}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium p-1 rounded-full w-6 h-6 flex items-center justify-center ${
            isToday && !isSelected ? 'bg-blue-500 text-white' : ''
          } ${
            isSelected ? 'text-blue-600' : 'text-gray-700'
          }`}>
            {day}
          </div>
          
          <div className="mt-1 space-y-1 overflow-y-auto max-h-16">
            {tasksForDay.slice(0, 2).map((task, index) => (
              <div 
                key={index}
                className={`text-xs p-1 rounded truncate ${
                  task.priority === 'high' ? 'bg-red-50 text-red-700' :
                  task.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-green-50 text-green-700'
                }`}
              >
                {task.title}
              </div>
            ))}
            {tasksForDay.length > 2 && (
              <div className="text-xs text-gray-500 pl-1">
                +{tasksForDay.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedTasks = getTasksForDate(selectedDate);
  const totalTasks = sampleTasks.length;
  const upcomingTasks = sampleTasks.filter(task => new Date(task.dueDate) >= new Date()).length;

  return (
    <div className="max-w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Task Calendar</h2>
          </div>
          <div className="flex gap-2">
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
              {totalTasks} Total
            </span>
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
              {upcomingTasks} Upcoming
            </span>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {getMonthYear(currentDate)}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 border-b border-gray-200">
        {renderCalendarGrid()}
      </div>

      {/* Selected Date Tasks */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-md font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            {formatDate(selectedDate)}
          </h4>
          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-600">
            {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''}
          </span>
        </div>

        {selectedTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No tasks scheduled for this day</p>
            <p className="text-xs mt-1 opacity-70">Enjoy your free time! 🎉</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedTasks.map((task, index) => (
              <div
                key={task.id || index}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-blue-400 to-blue-600`}>
                    {task.title?.charAt(0) || 'T'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 mb-1 truncate">
                      {task.title}
                    </h5>
                    {task.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {getPriorityIcon(task.priority)}
                        {task.priority || 'normal'}
                      </span>
                      {task.category && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {task.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <p className="text-xs font-medium text-gray-600 mb-2">Priority Legend:</p>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-gray-600">High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-gray-600">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-600">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;