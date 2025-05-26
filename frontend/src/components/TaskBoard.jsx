import React from "react";
import { Box, Paper, Typography, Toolbar } from "@mui/material"; // ✅ Added Toolbar import

const TaskColumn = ({ title, children }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 280, m: 1, flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children} {/* This allows task cards to be passed in */}
    </Paper>
  );
};

const TaskBoard = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, ml: 30 }}
    >
      <Toolbar /> {/* ✅ MUI Toolbar for spacing from the top */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "flex-start",
        }}
      >
        <TaskColumn title="To Do" />
        <TaskColumn title="In Progress" />
        <TaskColumn title="Completed" />
      </Box>
    </Box>
  );
};

export default TaskBoard;
