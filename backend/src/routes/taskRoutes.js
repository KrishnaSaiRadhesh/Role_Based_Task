// src/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// Permissions: tasks:create, tasks:read, tasks:update, tasks:delete

router.post("/", auth, checkPermission("tasks:create"), createTask);
router.get("/", auth, checkPermission("tasks:read"), getTasks);
router.put("/:id", auth, checkPermission("tasks:update"), updateTask);
router.delete("/:id", auth, checkPermission("tasks:delete"), deleteTask);

module.exports = router;
