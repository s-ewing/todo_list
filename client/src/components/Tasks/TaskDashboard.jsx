import TaskList from "./TaskList";
import NewTaskModal from "./NewTaskModal";
import { useState, useEffect } from "react";
import { getTasks } from "../../services/task";
import useAxiosProtected from "../../hooks/useAxiosProtected";
import { Button, Box, useDisclosure } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";

const TaskDashboard = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState([]);
  const axiosProtected = useAxiosProtected();
  const logout = useLogout();

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
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return {
          ...task,
          status: task.status === "incomplete" ? "complete" : "incomplete",
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Box>
      <NewTaskModal isOpen={isOpen} onClose={onClose} addTask={addTask} />
      <TaskList
        tasks={tasks}
        axios={axiosProtected}
        removeTask={removeTask}
        toggleTaskStatus={toggleTaskStatus}
      />
      <Button colorScheme="green" mt={6} onClick={onOpen}>
        Create Task
      </Button>
      <Button colorScheme="blue" mt={6} onClick={logout}>Sign Out</Button>
    </Box>
  );
};

export default TaskDashboard;
