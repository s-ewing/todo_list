import TaskList from "./TaskList";
import NewTaskModal from "./NewTaskModal";
import { useState, useEffect } from "react";
import { getTasks } from "../../services/task";
import useAxiosProtected from "../../hooks/useAxiosProtected";
import { Button, Box, useDisclosure } from "@chakra-ui/react";

const TaskDashboard = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState([]);
  const axiosProtected = useAxiosProtected();

  //get tasks for user
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks(axiosProtected);
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task._id !== taskId);
    setTasks(updatedTasks);
  }

  return (
    <Box>
      <NewTaskModal
        isOpen={isOpen}
        onClose={onClose}
        addTask={addTask}
      />
      <TaskList tasks={tasks} axios={axiosProtected} removeTask={removeTask}/>
      <Button colorScheme="green" mt={6} onClick={onOpen}>
        Create Task
      </Button>
    </Box>
  );
};

export default TaskDashboard;
