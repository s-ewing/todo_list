import { useState, useEffect } from "react";
import { getTasks } from "../../services/task";
import { List, Stack } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import useAuth from "../../hooks/useAuth";

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const { auth } = useAuth();

  //get tasks for user
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks(auth.accessToken);
      setTasks(tasks);
    };
    fetchTasks();
  }, [auth]);

  return (
    <List>
      <Stack spacing={3}>
        {tasks.map((task) => (
          <TaskItem task={task} key={task._id} />
        ))}
      </Stack>
    </List>
  );
};

export default TaskList;
