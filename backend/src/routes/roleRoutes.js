// src/routes/roleRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");
const {
  createRole,
  getRoles,
  updateRole,
  deleteRole
} = require("../controllers/roleController");

// Permissions:
// roles:create, roles:read, roles:update, roles:delete

router.post("/", auth, checkPermission("roles:create"), createRole);
router.get("/", auth, checkPermission("roles:read"), getRoles);
router.put("/:id", auth, checkPermission("roles:update"), updateRole);
router.delete("/:id", auth, checkPermission("roles:delete"), deleteRole);

module.exports = router;
