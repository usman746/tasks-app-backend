const { validationResult } = require("express-validator");
const Task = require("../models/Tasks");

// create task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, status, dueDate } = req.body;
  const userId = req.user.userId; // Set by authMiddleware

  try {
    const task = new Task({ title, description, status, dueDate, userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all tasks
exports.getTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single task
exports.getSingleTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const task = await Task.findOne({ _id: id, userId });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
