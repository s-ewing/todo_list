import React from "react";
import TaskList from "./TaskList";
import { Button, Box } from "@chakra-ui/react";

const TaskDashboard = ({ user }) => {
  return (
    <Box>
      <TaskList user={user} />
      <Button colorScheme="green" mt={6}>Create Task</Button>
    </Box>
  );
};

export default TaskDashboard;
