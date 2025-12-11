const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");
const { getUsers, assignRoles } = require("../controllers/userController");

// Permissions: users:read, users:update

router.get("/", auth, checkPermission("users:read"), getUsers);
router.put("/:id/roles", auth, checkPermission("users:update"), assignRoles);

module.exports = router;
