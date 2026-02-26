import Task from "../models/task.model.js";
import { encrypt, decrypt } from "../utils/encryption.js";

// create task
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

        const encryptedDescription = description
      ? encrypt(description)
      : "";

    const task = await Task.create({
      title,
      description: encryptedDescription,
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

// get task which is filter and search
export const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 5, 20);
    const status = req.query.status;
    const search = req.query.search;

    const query = {
      user: req.user._id
    };
 
    if (status) {
      query.status = status;
    }

    if (search) {
      query.title = {
        $regex: search,
        $options: "i"
      };
    }

    const total = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);


    const decryptedTasks = tasks.map(task => ({
      ...task.toObject(),
      description: task.description
        ? decrypt(task.description)
        : ""
    }));
  

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: decryptedTasks
    });

  } catch (error) {
   next(error);
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