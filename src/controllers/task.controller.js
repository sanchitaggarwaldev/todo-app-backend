import Task from "../models/Task.js";

/**
 * @desc Create a new task
 * @route POST /api/tasks/create-task
 */
export const createTask = async (req, res) => {
  try {
    const { name, dueDate, description } = req.body;

    if (!name || !dueDate || !description) {
      return res.status(400).json({ message: "Name, description and dueDate are required" });
    }

    const task = await Task.create({ name, description, dueDate });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get all tasks
 * @route GET /api/tasks/list-all-tasks
 */
export const listAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get a single task by ID
 * @route GET /api/tasks/list-single-task?id=123
 */
export const listSingleTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Update a task by ID
 * @route PUT /api/tasks/update-task?id=123
 */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Delete a task by ID
 * @route DELETE /api/tasks/delete-task?id=123
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Complete a task by ID
 * @route COMPLETE /api/tasks/complete-task?id=123
 */
export const completeTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const completeTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!completeTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: true, data: completeTask });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
};
