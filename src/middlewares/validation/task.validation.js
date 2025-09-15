import { body, param } from "express-validator";

export const validateCreateTask = [
  body("name")
    .notEmpty()
    .withMessage("Task name is required")
    .isLength({ min: 3 })
    .withMessage("Task name must be at least 3 characters"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date in ISO format (YYYY-MM-DD)"),
];

export const validateUpdateTask = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),

  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Task name must be at least 3 characters"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date"),
  
  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be true or false"),
];

export const validateTaskId = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),
];
