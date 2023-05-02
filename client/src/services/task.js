export const getTasks = async (axios) => {
  try {
    const res = await axios.get("/api/tasks");
    const tasks = res.data;
    return tasks;
  } catch (err) {
    console.error(err);
  }
};

export const createTask = async (axios, title, description) => {
  try {
    const res = await axios.post("/api/tasks", { title, description });
    const newTask = res.data;
    return { newTask: newTask, message: "Task created" };
  } catch (err) {
    if (err.response) {
      return { newTask: null, message: err.response.data.message };
    }
  }
};

export const updateTask = async (axios, taskId, status) => {
  try {
    const res = await axios.put(`/api/tasks/${taskId}`, { status });
    const updatedTask = res.data;
    console.log(updatedTask)
    return { updatedTask: updatedTask, message: "Status updated" };
  } catch (err) {
    if (err.response) {
      return { updatedTask: null, message: err.response.data.message };
    }
  }
};

export const deleteTask = async (axios, taskId) => {
  try {
    const res = await axios.delete(`/api/tasks/${taskId}`);
    return { status: 200, message: "Task deleted" };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    }
  }
};
