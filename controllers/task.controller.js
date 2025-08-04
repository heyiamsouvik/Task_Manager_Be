const Task = require("../models/task.model");
const User = require("../models/user.model");

const addTask = async (req, res) => {
  console.log(`addtask:${process.env.FE_WEBSITE_LINK}`);
  try {
    const { title, description, priority, status } = req.body;
    const { user } = req;
    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }
    if (title.length < 1) {
      return res.status(400).json({
        message: "Title required!",
        success: false,
      });
    }
    if (description.length < 1) {
      return res.status(400).json({
        message: "description required!",
        success: false,
      });
    }
    const newTask = new Task({ title, description, priority, status });
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();

    return res.status(201).json({
      message: "Task Added",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
  
      error: err.message,
      success: false,
    });
  }
};

const editTask = async (req, res) => {
  console.log(`edittask:${process.env.FE_WEBSITE_LINK}`);
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }
    if (title.length < 1) {
      return res.status(400).json({
        message: "Title required!",
        success: false,
      });
    }
    if (description.length < 1) {
      return res.status(400).json({
        message: "description required!",
        success: false,
      });
    }

    await Task.findByIdAndUpdate(id, { title, description, priority, status });

    return res.status(201).json({
      message: "Task Updated",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update task",
      success: false,
      error: err.message,
    });
  }
};

const getTask = async (req, res) => {
  console.log(`gettaskbyid:${process.env.FE_WEBSITE_LINK}`);
  try {
    const { id } = req.params;
    const taskdetails = await Task.findById(id);
    return res.status(200).json({ taskdetails });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get task",
      error: err.message,
      success: false,
    });
  }
};

const deleteTask = async (req, res) => {
  console.log(`deletetask:${process.env.FE_WEBSITE_LINK}`);
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Task Deleted",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete task",
      error: err.message,
      success: false,
    });
  }
};

const userDetails = async (req, res) => {
  console.log(`alltask:${process.env.FE_WEBSITE_LINK}`);
  try {
    const user = req.user;
    const getDetails = await User.findById(user._id)
      .populate("tasks")
      .select("-password");
    if (getDetails) {
      const alltasks = getDetails.tasks;
      let yetToStart = [];
      let inProgress = [];
      let completed = [];

      alltasks.forEach((item) => {
        if (item.status === "yetToStart") {
          yetToStart.push(item);
        } else if (item.status === "inProgress") {
          inProgress.push(item);
        } else if (item.status === "completed") {
          completed.push(item);
        }
      });
      return res.status(200).json({
        success: true,
        tasks: {
          yetToStart,
          inProgress,
          completed,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = { addTask, editTask, getTask, deleteTask, userDetails };
