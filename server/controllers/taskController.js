const Task = require("../models/Task");

const createNewTask = async (req, res, next) => {
  const { title, description } = req.body;
  const userId = req.userId;

  //Confirm data
  if (!title) {
    res
      .status(400)
      .json({ message: "Task title is required" });
    return;
  }
  try {
    //Save new task
    const newTask = await Task.create({ userId, title, description });

    //Send response
    if (newTask) {
      res.status(201).json(newTask);
    } else {
      res.status(400).json({ message: "Invalid title or description" });
    }
  } catch (err) {
    next(err);
  }
};

const getTasksByUserId = async (req, res, next) => {
  const userId = req.userId;

  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  const userId = req.userId;
  const { title, description, status } = req.body;

  if (!title) {
    res
      .status(400)
      .json({ message: "Task title is required" });
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
      return;
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  const userId = req.userId;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createNewTask, getTasksByUserId, updateTask, deleteTask };
