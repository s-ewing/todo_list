import { ListItem, Text } from "@chakra-ui/react";

const TaskItem = ({ task }) => {
  return (
    <ListItem>
      <Text fontSize="2xl">{task.title}</Text>
      <Text fontSize="md">{task.description}</Text>
    </ListItem>
  );
};

export default TaskItem;
