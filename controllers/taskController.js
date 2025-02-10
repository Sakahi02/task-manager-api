const Task = require('../models/taskModel');

// Create task
const createTask = async (req, res) => {
  const { title, description, status, priority, due_date, assigned_to } = req.body;

  const task = new Task({ title, description, status, priority, due_date, assigned_to });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get tasks
const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter = '', sort = 'createdAt' } = req.query;
    const tasks = await Task.find({ title: { $regex: filter, $options: 'i' } })
      .sort({ [sort]: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments();
    res.send({ tasks, total });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.priority = req.body.priority || task.priority;
    task.due_date = req.body.due_date || task.due_date;
    task.assigned_to = req.body.assigned_to || task.assigned_to;

    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
   
    await Task.deleteOne({ _id: taskId });

    res.send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
