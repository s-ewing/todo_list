import {
  ListItem,
  Text,
  HStack,
  Box,
  Stack,
  IconButton,
  Divider
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
    console.log(status);
    try {
      const newStatus = status === "incomplete" ? "complete" : "incomplete";
      console.log(newStatus)
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
      <HStack spacing={4}>
        <Stack spacing={2}>
          <IconButton onClick={() => handleStatusToggle(task._id, task.status)} bg="green.400" boxSize={5}>
            <CheckIcon boxSize={3} color="whiteAlpha.900"/>
          </IconButton>
          <IconButton onClick={() => handleDeleteTask(task._id)} bg="red.400" boxSize={5}>
            <DeleteIcon boxSize={3} color="whiteAlpha.900"/>
          </IconButton>
        </Stack>
        <Box>
          <Text fontSize="xl" textDecor={task.status === "complete" ? "line-through" : "none"}>{task.title}</Text>
          <Text fontSize="sm" textDecor={task.status === "complete" ? "line-through" : "none"}>{task.description}</Text>
        </Box>
      </HStack>
      <Divider my={1} />
    </ListItem>
  );
};

export default TaskItem;
