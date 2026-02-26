import Task from "../models/task.model.js";

// create task
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      data: task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error"
    });
  }
};

// get all task for only login users

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tasks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// update the task

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "task not found"
      });
    }

    const { title, description, status } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();

    res.status(200).json({
      success: true,
      data: task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error"
    });
  }
};

// delete the task

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "task deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error"
    });
  }
};