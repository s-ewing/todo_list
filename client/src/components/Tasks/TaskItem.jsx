import {
  ListItem,
  Text,
  HStack,
  Box,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { deleteTask } from "../../services/task";

const TaskItem = ({ task, removeTask, axios }) => {
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
  return (
    <ListItem>
      <HStack spacing={8}>
        <Stack spacing={2}>
          <IconButton>
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
