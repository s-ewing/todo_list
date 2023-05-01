import { List, Stack } from "@chakra-ui/react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, removeTask, toggleTaskStatus, axios }) => {
  return (
    <List>
      <Stack spacing={3}>
        {tasks.map((task) => (
          <TaskItem
            task={task}
            key={task._id}
            removeTask={removeTask}
            toggleTaskStatus={toggleTaskStatus}
            axios={axios}
          />
        ))}
      </Stack>
    </List>
  );
};

export default TaskList;
