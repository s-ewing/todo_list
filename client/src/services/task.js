export const getTasks = async (axios) => {
  try {
    const res = await axios.get("/tasks");
    const tasks = res.data;
    return tasks;
  } catch (err) {
    console.error(err);
  }
};

export const createTask = async (axios, title, description) => {
  try {
    const res = await axios.post("/tasks", { title, description });
    const newTask = res.data;
    return {newTask: newTask, message: "task created"};
  } catch (err) {
    if(err.response) {
        return {newTask: null, message: err.response.data.message}
    }
  }
};
