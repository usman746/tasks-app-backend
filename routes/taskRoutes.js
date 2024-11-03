const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const taskControllers = require("../controllers/taskControllers");

// POST /tasks: Create a new task
router.post(
  "/tasks",
  authMiddleware,
  [
    check("title", "Title is required").notEmpty(),
    check(
      "description",
      "Description must be at least 5 characters long"
    ).isLength({ min: 5 }),
    check("status", "Status is required").notEmpty(),
    check("dueDate", "Due date must be a valid date").optional().isISO8601(),
  ],
  taskControllers.createTask
);

// GET /tasks: Retrieve all tasks for the logged-in user
router.get("/tasks", authMiddleware, taskControllers.getTasks);

// GET /tasks/:id Retrieve a specific task for the logged-in user
router.get("/tasks/:id", authMiddleware, taskControllers.getSingleTask);

// PUT /tasks/:id: Update an existing task
router.put(
  "/tasks/:id",
  authMiddleware,
  [
    check("title", "Title must not be empty").optional().notEmpty(),
    check("description", "Description must be at least 5 characters long")
      .optional()
      .isLength({ min: 5 }),
    check("status", "Status must not be empty").optional().notEmpty(),
    check("dueDate", "Due date must be a valid date").optional().isISO8601(),
  ],
  taskControllers.updateTask
);

// DELETE /tasks/:id: Delete a task
router.delete("/tasks/:id", authMiddleware, taskControllers.deleteTask);

module.exports = router;
