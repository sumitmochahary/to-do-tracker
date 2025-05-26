import React from "react";
import { Box, Paper, Typography, Card, CardContent } from "@mui/material";

const TaskCard = ({ task }) => (
  <Card sx={{ mb: 1 }}>
    <CardContent sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {task.taskTitle}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {task.taskDescription}
      </Typography>
      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
        Due: {task.taskDueDate}
      </Typography>
    </CardContent>
  </Card>
);

const Column = ({ title, tasks = [] }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, minHeight: 400 }}>
      <Typography variant="h6" gutterBottom>
        {title} ({tasks.length})
      </Typography>
      <Box>
        {tasks.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No tasks in this column
          </Typography>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.taskId || task.id} task={task} />
          ))
        )}
      </Box>
    </Paper>
  );
};

export default Column;