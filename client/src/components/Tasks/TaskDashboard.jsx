import TaskList from "./TaskList";
import NewTaskModal from "./NewTaskModal";
import { useState, useEffect } from "react";
import { getTasks } from "../../services/task";
import useAxiosProtected from "../../hooks/useAxiosProtected";
import {
  Button,
  Flex,
  HStack,
  Box,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
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
    <Box h="95vh" w="95vw" p={8} border="3px solid" bg="cyan.100">
      <Flex>
          <Button colorScheme="cyan" onClick={onOpen} size="md" border="1px solid">
            Create Task
          </Button>
        <Spacer />
          <Button colorScheme="teal" onClick={logout} size="md" border="1px solid black">
            Sign Out
          </Button>
      </Flex>
      <Flex mt={7}>
        <NewTaskModal isOpen={isOpen} onClose={onClose} addTask={addTask} />
        <TaskList
          tasks={tasks}
          axios={axiosProtected}
          removeTask={removeTask}
          toggleTaskStatus={toggleTaskStatus}
        />
      </Flex>
    </Box>
  );
};

export default TaskDashboard;
