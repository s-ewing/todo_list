import {
  FormControl,
  FormLabel,
  Stack,
  Input,
  Button,
  Box,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { useState } from "react";
import { createTask } from "../../services/task";
import { axiosProtected } from "../../api/axios";

const TaskForm = ({ onClose, addTask }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (formData.title.trim().length === 0) {
        setError("Title cannot be blank");
        setFormData({title: "", description: ""})
        return false;
    }
    try {
      const { newTask, message } = await createTask(
        axiosProtected,
        formData.title,
        formData.description
      );
      if (newTask) {
        addTask(newTask);
        setFormData({ title: "", description: "" });
        onClose();
      } else {
        setError(message);
      }
    } catch (err) {
      setError("Invalid task title");
    }
  };

  return (
    <Box>
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleCreateTask}>
        <Stack spacing={4} p={4} mb={3}>
          <FormControl isRequired>
            <FormLabel requiredIndicator>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              focusBorderColor="black"
              border="1px solid"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              focusBorderColor="black"
              border="1px solid"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg">
            Create Task
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default TaskForm;
