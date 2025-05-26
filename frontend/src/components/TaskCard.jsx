import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TaskCard = ({ task }) => {
  return (
    <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;