import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createTask, listAllTasks, listSingleTask, deleteTask, updateTask, completeTask } from "../controllers/task.controller.js";
import { validateCreateTask, validateUpdateTask, validateTaskId } from "../middlewares/validation/task.validation.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.use(protect);

router.post("/create-task", validateCreateTask, validateRequest, createTask);
router.get("/list-all-tasks", listAllTasks);
router.get("/list-single-task/:id", validateTaskId, validateRequest, listSingleTask);
router.delete("/delete-task/:id", validateTaskId, validateRequest, deleteTask);
router.put("/update-task/:id", validateUpdateTask, validateRequest, updateTask);
router.patch("/complete-task/:id", validateUpdateTask, validateRequest, completeTask);

export default router;

