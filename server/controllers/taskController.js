const Task = require("../models/Task");

const createNewTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  //Confirm data
  if (!title || !description) {
    res
      .status(400)
      .json({ message: "Task title and description are required" });
    return;
  }
  try {
    //Save new task
    const newTask = await Task.create({ userId, title, description });

    //Send response
    if (newTask) {
      res.status(201).json({ message: "Task created" });
    } else {
      res.status(400).json({ message: "Invalid title or description" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getTasksByUserId = async (req, res) => {
  const userId = req.userId;

  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.userId;
  const { title, description, status } = req.body;

  if (!title || !description) {
    res
      .status(400)
      .message({ json: "Task title and description are required" });
    return;
  }

  try {
    //update task and return updated task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { title, description, status },
      {
        new: true,
      }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.userId;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createNewTask, getTasksByUserId, updateTask, deleteTask };
