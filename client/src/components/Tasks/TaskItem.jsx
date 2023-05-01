import {
  ListItem,
  Text,
  HStack,
  Box,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { deleteTask, updateTask } from "../../services/task";

const TaskItem = ({ task, removeTask, toggleTaskStatus, axios }) => {
  const handleDeleteTask = async (taskId) => {
    try {
      //delete task from server
      const res = await deleteTask(axios, taskId);
      if (res.status === 200) {
        //remove task from state
        removeTask(taskId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusToggle = async (taskId, status) => {
    try {
      const newStatus = status === "incomplete" ? "complete" : "incomplete";
      const res = await updateTask(axios, taskId, newStatus);
      if (res.updatedTask) {
        toggleTaskStatus(taskId);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ListItem>
      <HStack spacing={8}>
        <Stack spacing={2}>
          <IconButton onClick={() => handleStatusToggle(task._id, task.status)}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteTask(task._id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
        <Box>
          <Text fontSize="2xl">{task.title}</Text>
          <Text fontSize="md">{task.description}</Text>
        </Box>
      </HStack>
    </ListItem>
  );
};

export default TaskItem;
