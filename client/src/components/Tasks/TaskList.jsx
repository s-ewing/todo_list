import { useState, useEffect } from "react";
import { getTasks } from "../../services/task";
import { List, Stack } from "@chakra-ui/react";
import TaskItem from "./TaskItem";

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  //get tasks for user
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks(user);
      setTasks(tasks);
    };
    fetchTasks();
  }, [user]);

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
