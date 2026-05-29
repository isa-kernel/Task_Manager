const Task = require('../models/Task.js');

const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      title,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    // Find tasks for the logged-in user
    const tasks = await Task.find({
      user: req.user._id,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check task exists
    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    // Ownership protection
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    // Update task
    task.title = req.body.title || task.title;

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check task exists
    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    // Ownership protection
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};